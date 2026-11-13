# Schach-Trainer

Ein Eröffnungstrainer für Schach im Browser. Du lernst Eröffnungen Zug für Zug, wirst abgefragt und wiederholst Varianten nach einem Lernsystem. Deine Partien von Chess.com kannst du hochladen, um deine drei häufigsten Eröffnungen und deine typischen Abweichungen von der Theorie zu finden.

## Funktionen

- **28 Eröffnungen mit 130 Varianten**, alle mit Erklärungen auf Deutsch, abgestimmt auf etwa 600 bis 1000 Elo.
- **Lernen:** Ein Pfeil zeigt den Theoriezug, dazu gibt es die Idee hinter dem Zug.
- **Abfragen:** Du spielst ohne Hilfe. Fehler werden gezählt, Varianten mit Fehlern kommen öfter dran.
- **Meine Partien:** PGN-Dateien von Chess.com hochladen und Top 3, Bilanz und häufigste Abweichungen sehen.
- **Computer-Gegner (Stockfish 18):** Der Gegner variiert seine Theoriezüge und weicht auf Wunsch überraschend von der Theorie ab. Nach dem Ende einer Variante spielst du gegen den Computer weiter. Er bewertet jeden deiner Züge (Bester Zug bis Grober Fehler), zeigt den besseren Zug und antwortet in der eingestellten Stärke.
- **Speichern in GitHub:** Der Lernstand wird automatisch als `fortschritt.json` im Branch `fortschritt` dieses Repositorys gespeichert.

## Starten

Die App ist eine statische Webseite. Am einfachsten über GitHub Pages:

1. Repository-Einstellungen → **Pages**.
2. Bei **Source** „Deploy from a branch“ wählen, Branch `main`, Ordner `/ (root)`.
3. Nach etwa einer Minute läuft die App unter `https://<benutzer>.github.io/Schach-Trainer/`.

Lokal brauchst du einen kleinen Webserver, weil Browser die Engine nicht direkt aus einer Datei laden: `python3 -m http.server` im Ordner starten und `http://localhost:8000` öffnen. Ohne Webserver läuft der Trainer trotzdem, nur ohne Computer-Gegner.

## Fortschritt automatisch speichern

1. Auf GitHub einen [Fine-grained Token](https://github.com/settings/personal-access-tokens/new) erstellen:
   - Repository access: **Only select repositories** → nur dieses Repository.
   - Repository permissions: **Contents → Read and write**. Sonst nichts.
2. In der App den Reiter **Speichern** öffnen, Token einfügen, **Verbinden und laden** klicken.

Danach speichert die App etwa 15 Sekunden nach jeder Änderung und sofort, wenn du die Seite verlässt. Beim Öffnen lädt sie den gespeicherten Stand und führt ihn mit dem Stand auf dem Gerät zusammen (pro Variante gewinnt der neuere Eintrag). So kannst du auf mehreren Geräten üben.

Der Token bleibt nur im Browser des jeweiligen Geräts und wird nie ins Repository geschrieben. Bei einem öffentlichen Repository ist `fortschritt.json` für alle lesbar. Die Datei enthält nur den Lernstand und die Eröffnungsstatistik.

Der Fortschritt liegt absichtlich in einem eigenen Branch, damit GitHub Pages nicht bei jedem Speichern neu baut.

## Aufbau

| Datei | Inhalt |
| --- | --- |
| `index.html` | Seitenstruktur |
| `style.css` | Gestaltung, helles und dunkles Farbschema |
| `js/openings.js` | Eröffnungsdatenbank (Varianten mit Erklärungen in geschweiften Klammern) |
| `js/app.js` | Brett, Trainer, Lernsystem, PGN-Auswertung |
| `js/sync.js` | Automatisches Speichern über die GitHub-API |
| `js/engine.js` | Anbindung an Stockfish (UCI über Web Worker) |
| `js/vendor/chess.js` | Schachregeln ([chess.js](https://github.com/jhlywa/chess.js) 0.10.3, BSD-Lizenz) |
| `pieces/` | Figuren als SVG, nach dem Satz „cburnett“ von Colin M. L. Burnett (GPLv2+), mit Schattierung |
| `engine/` | [Stockfish.js](https://github.com/nmrugg/stockfish.js) 18 lite, GPL-3.0 (siehe `engine/Copying.txt`) |

Neue Varianten trägst du in `js/openings.js` ein. Züge in englischer Notation (N, B, R, Q, K), Kommentare direkt hinter dem Zug in `{…}`.

## Computer-Gegner

Im Trainer findest du rechts den Abschnitt **Computer-Gegner**:

- **Stärke:** von Anfänger (~600) bis Maximum. Schwächere Stufen wählen zufällig unter mehreren guten Zügen und machen gelegentlich schwächere Züge.
- **Gegner weicht von der Theorie ab:** Nie, Manchmal oder Oft. Dann spielt der Gegner einen plausiblen Zug außerhalb der Theorie, und ab da bewertet der Computer deine Züge.
- **Nach dem Ende der Variante:** weiterspielen oder anhalten.

Spielst du in der Theoriephase einen anderen Zug, sagt dir der Computer, wie gut er war. Mit „frei weiterspielen“ kannst du die Partie mit deinem Zug fortsetzen. Nach einer Ungenauigkeit oder einem Fehler wartet der Computer: Du kannst zurücknehmen oder bewusst so weiterspielen.

Die Engine ist Stockfish 18 in der „lite single-threaded“-Variante (etwa 7 MB). Sie läuft komplett im Browser, ohne Server.
