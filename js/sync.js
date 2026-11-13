/* Automatisches Speichern des Fortschritts in einem GitHub-Repository.
 *
 * Gespeichert wird die Datei fortschritt.json in einem eigenen Branch
 * (Standard: "fortschritt"), damit GitHub Pages nicht bei jedem Speichern
 * neu baut. Der Token liegt nur im localStorage dieses Browsers.
 */
(function () {
  "use strict";
  const API = "https://api.github.com";
  const FILE = "fortschritt.json";
  const KEYS = ["ot.prog", "ot.ana", "ot.user", "ot.last"];
  const DEBOUNCE_MS = 15000;

  const ls = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
    del(k) { try { localStorage.removeItem(k); } catch (e) {} },
  };
  const json = (k, d) => { try { const v = ls.get(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } };

  function guessRepo() {
    const m = location.hostname.match(/^([^.]+)\.github\.io$/i);
    const seg = location.pathname.split("/").filter(Boolean)[0];
    if (m && seg) return m[1] + "/" + seg;
    return "Silas2606/Schach-Trainer";
  }

  const cfg = {
    get repo() { return ls.get("ot.gh.repo") || guessRepo(); },
    get branch() { return ls.get("ot.gh.branch") || "fortschritt"; },
    get token() { return ls.get("ot.gh.token") || ""; },
  };

  let sha = null;          // sha der zuletzt gelesenen/geschriebenen Datei
  let timer = null;
  let dirty = false;
  let saving = null;
  let listeners = [];
  let mergedListeners = [];
  let state = { kind: "local", text: "Nur auf diesem Gerät", at: 0 };

  function setState(kind, text) {
    state = { kind, text, at: Date.now() };
    listeners.forEach(fn => { try { fn(state); } catch (e) {} });
  }

  // ---------- Base64 mit UTF-8 ----------
  function b64encode(str) {
    const bytes = new TextEncoder().encode(str);
    let bin = "";
    for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return btoa(bin);
  }
  function b64decode(b64) {
    const bin = atob(b64.replace(/\s/g, ""));
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }

  async function gh(path, opts = {}) {
    const res = await fetch(API + path, {
      ...opts,
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: "Bearer " + cfg.token,
        "X-GitHub-Api-Version": "2022-11-28",
        ...(opts.body ? { "Content-Type": "application/json" } : {}),
      },
    });
    return res;
  }

  function errorText(res, where) {
    if (res.status === 401) return "Der Token ist ungültig oder abgelaufen.";
    if (res.status === 403) return "Der Token darf hier nicht schreiben. Prüfe, ob Contents auf „Read and write“ steht.";
    if (res.status === 404) return "Repository nicht gefunden. Prüfe den Namen und ob der Token Zugriff darauf hat.";
    return where + " ist fehlgeschlagen (HTTP " + res.status + ").";
  }

  // ---------- Branch anlegen, falls nötig ----------
  async function ensureBranch() {
    const r = await gh(`/repos/${cfg.repo}/branches/${encodeURIComponent(cfg.branch)}`);
    if (r.ok) return;
    if (r.status !== 404) throw new Error(errorText(r, "Branch prüfen"));
    const repo = await gh(`/repos/${cfg.repo}`);
    if (!repo.ok) throw new Error(errorText(repo, "Repository lesen"));
    const def = (await repo.json()).default_branch;
    const ref = await gh(`/repos/${cfg.repo}/git/ref/heads/${encodeURIComponent(def)}`);
    if (!ref.ok) throw new Error(errorText(ref, "Branch lesen"));
    const base = (await ref.json()).object.sha;
    const mk = await gh(`/repos/${cfg.repo}/git/refs`, {
      method: "POST",
      body: JSON.stringify({ ref: "refs/heads/" + cfg.branch, sha: base }),
    });
    if (!mk.ok && mk.status !== 422) throw new Error(errorText(mk, "Branch anlegen"));
  }

  async function readRemote() {
    const r = await gh(`/repos/${cfg.repo}/contents/${FILE}?ref=${encodeURIComponent(cfg.branch)}`, { cache: "no-store" });
    if (r.status === 404) { sha = null; return null; }
    if (!r.ok) throw new Error(errorText(r, "Laden"));
    const j = await r.json();
    sha = j.sha;
    return JSON.parse(b64decode(j.content));
  }

  // ---------- Zusammenführen: pro Variante gewinnt der neuere Eintrag ----------
  function score(s) { return s ? (s.t || 0) : -1; }
  function merge(remote) {
    if (!remote) return false;
    let changed = false;
    const lp = json("ot.prog", {}), rp = remote.prog || {};
    for (const k in rp) {
      if (score(rp[k]) > score(lp[k])) { lp[k] = rp[k]; changed = true; }
    }
    ls.set("ot.prog", JSON.stringify(lp));
    const la = json("ot.ana", null), ra = remote.ana || null;
    if (ra && (!la || (ra.at || 0) > (la.at || 0))) { ls.set("ot.ana", JSON.stringify(ra)); changed = true; }
    if (remote.user && !ls.get("ot.user")) { ls.set("ot.user", JSON.stringify(remote.user)); changed = true; }
    if (remote.last && !ls.get("ot.last")) { ls.set("ot.last", JSON.stringify(remote.last)); changed = true; }
    if (changed) mergedListeners.forEach(fn => { try { fn(); } catch (e) {} });
    return changed;
  }

  function snapshot() {
    return {
      app: "schach-eroeffnungstrainer",
      version: 1,
      gespeichert: new Date().toISOString(),
      prog: json("ot.prog", {}),
      ana: json("ot.ana", null),
      user: json("ot.user", ""),
      last: json("ot.last", null),
    };
  }

  function putBody(message) {
    const body = { message, content: b64encode(JSON.stringify(snapshot(), null, 1)), branch: cfg.branch };
    if (sha) body.sha = sha;
    return JSON.stringify(body);
  }

  async function save(opts = {}) {
    if (!cfg.token) return;
    if (saving) { dirty = true; return saving; }
    clearTimeout(timer); timer = null;
    dirty = false;
    setState("busy", "Speichert …");
    saving = (async () => {
      try {
        let r = await gh(`/repos/${cfg.repo}/contents/${FILE}`, { method: "PUT", body: putBody("Fortschritt gespeichert"), keepalive: !!opts.keepalive });
        if (r.status === 409 || r.status === 422) {
          // Anderes Gerät hat zwischendurch gespeichert: neu laden, zusammenführen, nochmal.
          merge(await readRemote());
          r = await gh(`/repos/${cfg.repo}/contents/${FILE}`, { method: "PUT", body: putBody("Fortschritt gespeichert") });
        }
        if (!r.ok) throw new Error(errorText(r, "Speichern"));
        sha = (await r.json()).content.sha;
        setState("ok", "In GitHub gespeichert");
      } catch (e) {
        dirty = true;
        setState("error", e.message || "Speichern fehlgeschlagen");
      } finally {
        saving = null;
        if (dirty && !timer) schedule();
      }
    })();
    return saving;
  }

  function schedule() {
    if (!cfg.token) return;
    dirty = true;
    setState("pending", "Ungespeicherte Änderungen");
    clearTimeout(timer);
    timer = setTimeout(() => { timer = null; save(); }, DEBOUNCE_MS);
  }

  // Beim Verlassen der Seite sofort speichern.
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden" && dirty && cfg.token) save({ keepalive: true });
  });
  window.addEventListener("pagehide", () => { if (dirty && cfg.token) save({ keepalive: true }); });

  async function pull() {
    if (!cfg.token) { setState("local", "Nur auf diesem Gerät"); return false; }
    setState("busy", "Lädt aus GitHub …");
    try {
      await ensureBranch();
      const remote = await readRemote();
      const changed = merge(remote);
      if (!remote) await save(); else setState("ok", "Mit GitHub synchron");
      return changed;
    } catch (e) {
      setState("error", e.message || "Laden fehlgeschlagen");
      return false;
    }
  }

  window.Sync = {
    cfg,
    get state() { return state; },
    onState(fn) { listeners.push(fn); fn(state); },
    onMerged(fn) { mergedListeners.push(fn); },
    changed(key) { if (KEYS.includes(key)) schedule(); },
    pull,
    save,
    async connect(repo, branch, token) {
      ls.set("ot.gh.repo", repo.trim() || guessRepo());
      ls.set("ot.gh.branch", branch.trim() || "fortschritt");
      ls.set("ot.gh.token", token.trim());
      sha = null;
      return pull();
    },
    disconnect() {
      ls.del("ot.gh.token"); sha = null; clearTimeout(timer); dirty = false;
      setState("local", "Nur auf diesem Gerät");
    },
    // Beim Start: höchstens ein paar Sekunden auf GitHub warten, dann ohne weitermachen.
    ready: (function () {
      if (!cfg.token) return Promise.resolve(false);
      return Promise.race([pull(), new Promise(r => setTimeout(() => r(false), 6000))]);
    })(),
  };
})();
