/* Dünne Hülle um Stockfish (Web Worker, UCI-Protokoll).
 *
 * Engine.analyse(fen, {depth, multipv, movetime}) liefert:
 *   { lines: [{move, cp, mate, pv}], best }  –  Bewertung immer aus Sicht der Seite am Zug.
 * Aufrufe werden nacheinander abgearbeitet. Eine neue Analyse bricht eine laufende nicht ab,
 * sondern wartet; veraltete Ergebnisse verwirft der Aufrufer selbst.
 */
(function () {
  "use strict";
  const URL_ = "engine/stockfish-18-lite-single.js";

  function Engine() {
    this.ok = false;
    this.failed = false;
    this.listeners = [];
    this.queue = Promise.resolve();
    try {
      this.w = new Worker(URL_);
    } catch (e) {
      this.failed = true;
      this.ready = Promise.reject(e);
      this.ready.catch(() => {});
      return;
    }
    this.w.onmessage = (e) => {
      const line = typeof e.data === "string" ? e.data : "";
      this.listeners.slice().forEach((fn) => fn(line));
    };
    this.ready = new Promise((resolve, reject) => {
      const t = setTimeout(() => { this.failed = true; reject(new Error("timeout")); }, 20000);
      this.w.onerror = () => { clearTimeout(t); this.failed = true; reject(new Error("worker")); };
      this.waitFor("uci", "uciok")
        .then(() => this.waitFor("isready", "readyok"))
        .then(() => { clearTimeout(t); this.ok = true; resolve(); });
    });
    this.ready.catch(() => {});
  }

  Engine.prototype.send = function (cmd) { this.w.postMessage(cmd); };
  Engine.prototype.on = function (fn) { this.listeners.push(fn); };
  Engine.prototype.off = function (fn) { this.listeners = this.listeners.filter((f) => f !== fn); };
  Engine.prototype.waitFor = function (cmd, token) {
    return new Promise((resolve) => {
      const fn = (l) => { if (l.startsWith(token)) { this.off(fn); resolve(); } };
      this.on(fn);
      this.send(cmd);
    });
  };

  Engine.prototype.analyse = function (fen, opts = {}) {
    const depth = opts.depth || 12, multipv = opts.multipv || 1, movetime = opts.movetime || 2500;
    const run = () => new Promise((resolve) => {
      const lines = {};
      const fn = (l) => {
        if (l.startsWith("info") && l.includes(" pv ")) {
          const mp = +(l.match(/ multipv (\d+)/) || [0, 1])[1];
          const cp = l.match(/ score cp (-?\d+)/);
          const mate = l.match(/ score mate (-?\d+)/);
          const pv = l.split(" pv ")[1].trim().split(/\s+/);
          const d = +(l.match(/ depth (\d+)/) || [0, 0])[1];
          if (l.includes(" lowerbound") || l.includes(" upperbound")) return;
          lines[mp] = { move: pv[0], pv, depth: d, cp: cp ? +cp[1] : null, mate: mate ? +mate[1] : null };
        } else if (l.startsWith("bestmove")) {
          this.off(fn);
          const best = l.split(/\s+/)[1];
          const arr = Object.keys(lines).sort((a, b) => a - b).map((k) => lines[k]);
          resolve({ lines: arr, best: best && best !== "(none)" ? best : null });
        }
      };
      this.on(fn);
      this.send("setoption name MultiPV value " + multipv);
      this.send("position fen " + fen);
      this.send("go depth " + depth + " movetime " + movetime);
    });
    const p = this.queue.then(() => this.ready).then(run);
    this.queue = p.catch(() => {});
    return p;
  };

  // Bewertung in "Bauerneinheiten aus Sicht der Seite am Zug" für Vergleiche.
  Engine.score = function (line) {
    if (!line) return 0;
    if (line.mate != null) return line.mate > 0 ? 10000 - line.mate * 10 : -10000 - line.mate * 10;
    return line.cp || 0;
  };
  // Gewinnchance -1..1 (wie bei Lichess), robust gegen Mattwerte.
  Engine.winChance = function (score) {
    const cp = Math.max(-1000, Math.min(1000, score));
    return 2 / (1 + Math.exp(-0.00368208 * cp)) - 1;
  };

  window.Engine = Engine;
})();
