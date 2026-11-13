# Schach-Trainer

Ein Eröffnungstrainer für Schach im Browser. Du lernst Eröffnungen Zug für Zug, wirst abgefragt und wiederholst Varianten nach einem Lernsystem. Deine Partien von Chess.com kannst du hochladen, um deine drei häufigsten Eröffnungen und deine typischen Abweichungen von der Theorie zu finden.

## Funktionen

- **28 Eröffnungen mit 130 Varianten**, alle mit Erklärungen auf Deutsch, abgestimmt auf etwa 600 bis 1000 Elo.
- **Lernen:** Ein Pfeil zeigt den Theoriezug, dazu gibt es die Idee hinter dem Zug.
- **Abfragen:** Du spielst ohne Hilfe. Fehler werden gezählt, Varianten mit Fehlern kommen öfter dran.
- **Meine Partien:** PGN-Dateien von Chess.com hochladen und Top 3, Bilanz und häufigste Abweichungen sehen.
- **Speichern in GitHub:** Der Lernstand wird automatisch als `fortschritt.json` im Branch `fortschritt` dieses Repositorys gespeichert.

## Starten

Die App ist eine statische Webseite. Am einfachsten über GitHub Pages:

1. Repository-Einstellungen → **Pages**.
2. Bei **Source** „Deploy from a branch“ wählen, Branch `main`, Ordner `/ (root)`.
3. Nach etwa einer Minute läuft die App unter `https://<benutzer>.github.io/Schach-Trainer/`.

Lokal genügt es, `index.html` im Browser zu öffnen.

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

Neue Varianten trägst du in `js/openings.js` ein. Züge in englischer Notation (N, B, R, Q, K), Kommentare direkt hinter dem Zug in `{…}`.
