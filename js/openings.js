const OPENINGS = [
// ======================= WEISS =======================
{id:"italian", name:"Italienische Partie", eco:"C50–C54", side:"w",
 ideas:["Läufer nach c4: Druck auf f7, den schwächsten Punkt bei Schwarz.","Mit c3 und d4 das Zentrum übernehmen.","Früh rochieren und den Turm nach e1 stellen."],
 lines:[
 ["Giuoco Piano mit c3 und d4","e4{Besetzt das Zentrum und öffnet Dame und Läufer.} e5 Nf3{Greift e5 an und entwickelt eine Figur.} Nc6 Bc4{Der Läufer zielt auf f7, den schwächsten Punkt bei Schwarz.} Bc5 c3{Bereitet d4 vor, um das Zentrum zu übernehmen.} Nf6 d4{Jetzt kommt der Zentrumsvorstoß.} exd4 cxd4 Bb4+ Bd2{Einfach dazwischenstellen.} Bxd2+ Nbxd2 d5{Schwarz schlägt im Zentrum zurück.} exd5 Nxd5 Qb3{Greift d5 an und hält den Druck auf f7.}"],
 ["Giuoco Pianissimo mit d3","e4 e5 Nf3 Nc6 Bc4 Bc5 d3{Die ruhige Alternative zu c3: e4 ist gedeckt, d4 kommt später.} Nf6 c3 d6 O-O O-O Re1 a6 Bb3{Rückzug auf Vorrat, bevor ...b5 oder ...Sa5 kommt.}"],
 ["Zweispringerspiel, ruhig mit d3","e4 e5 Nf3 Nc6 Bc4 Nf6{Schwarz greift e4 an.} d3{Deckt e4 ruhig. Keine Experimente, solide Entwicklung.} Be7 O-O{Erst den König in Sicherheit bringen.} O-O Re1 d6 c3{Bereitet später d4 vor und gibt dem Läufer ein Rückzugsfeld.}"],
 ["Zweispringer mit ...Lc5","e4 e5 Nf3 Nc6 Bc4 Nf6 d3 Bc5 c3{Wieder c3: Der Plan bleibt d4.} d6 O-O O-O Re1 a6 Bb3{Der Läufer zieht vorsorglich zurück, damit ...b5 nicht mit Tempo kommt.}"],
 ["Falle: 3...Sd4","e4 e5 Nf3 Nc6 Bc4 Nd4{Ein Fallenzug. Nicht Sxe5?? wegen ...Dg5! mit Doppelangriff.} Nxd4{Sicher: einfach den Springer tauschen.} exd4 c3{Öffnet Linien und greift d4 an.} dxc3 Nxc3{Weiß ist weit voraus in der Entwicklung.}"],
 ["Passiv: 3...Le7","e4 e5 Nf3 Nc6 Bc4 Be7 d4{Gegen passives Spiel sofort das Zentrum öffnen.} exd4 Nxd4 Nf6 Nc3 O-O O-O{Weiß hat mehr Raum und freies Spiel.}"]
 ]},
{id:"london", name:"Londoner System", eco:"D02 / A46", side:"w",
 ideas:["Immer derselbe Aufbau: d4, Lf4, e3, Sf3, c3, Ld3, Sbd2.","Der Läufer kommt vor e3 heraus, sonst ist er eingesperrt.","Plan: Se5 und Königsangriff oder e4 im richtigen Moment."],
 lines:[
 ["Hauptaufbau gegen ...c5","d4{Damenbauer: das Grundgerüst des Londoner Systems.} d5 Bf4{Der Läufer kommt vor e3 heraus.} Nf6 e3{Das typische Dreieck c3-d4-e3 entsteht.} c5 c3{Stützt d4 bombenfest.} Nc6 Nd2{Springer nach d2, damit der Damenflügel stabil bleibt.} e6 Ngf3 Bd6 Bg3{Weicht dem Läufertausch aus und behält die Diagonale.} O-O Bd3"],
 ["Gegen ...e6 und ...Ld6","d4 d5 Bf4 Nf6 e3 e6 Nf3 Bd6 Bg3 O-O Bd3 c5 c3 Nc6 Nbd2{Das Aufbauschema steht. Plan: Se5, f4 oder De2 und e4.}"],
 ["Gegen Königsindisch-Aufbau","d4 Nf6 Bf4 g6 e3 Bg7 Nf3 O-O Be2 d6 h3{Gibt dem Läufer ein Rückzugsfeld auf h2 und verhindert ...Sh5 oder ...Lg4.}"],
 ["Falle: ...Db6 gegen b2","d4 d5 Bf4 c5 e3 Nc6 c3 Qb6{Schwarz greift b2 an.} Qb3{Bietet den Damentausch an und deckt b2.} c4 Qc2{Die Dame steht sicher und deckt b2 weiterhin.}"]
 ]},
{id:"scotch", name:"Schottische Partie", eco:"C45", side:"w",
 ideas:["Mit 3.d4 sofort das Zentrum öffnen.","Der Springer auf d4 ist zentral und aktiv.","Schnelle Entwicklung, klare Stellungen, wenig Theorie."],
 lines:[
 ["Klassisch mit ...Lc5","e4 e5 Nf3 Nc6 d4{Sofort das Zentrum aufbrechen.} exd4 Nxd4{Der Springer steht zentral.} Bc5 Be3{Deckt den Springer auf d4.} Qf6 c3{Noch einmal stützen.} Nge7 Bc4"],
 ["Mit ...Sf6","e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Nf6 Nxc6{Tausch, damit e5 mit Tempo kommen kann.} bxc6 e5{Vertreibt den Springer.} Qe7 Qe2 Nd5 c4{Jagt den Springer weiter.} Ba6 b3{Deckt c4.}"],
 ["Springertausch auf d4","e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Nxd4 Qxd4{Die Dame steht zentral und lässt sich nicht leicht vertreiben.} d6 Nc3 Nf6 Bc4 Be7 O-O O-O"],
 ["Schwarz nimmt sofort: 3...Sxd4","e4 e5 Nf3 Nc6 d4 Nxd4 Nxd4 exd4 Qxd4{Weiß hat das Zentrum und eine starke Dame.}"]
 ]},
{id:"vienna", name:"Wiener Partie", eco:"C25–C29", side:"w",
 ideas:["2.Sc3 deckt e4 und bereitet f4 vor.","Das Wiener Gambit führt zu schnellem Angriff über die f-Linie.","Gegen ...Sc6 kommt der Läufer nach c4."],
 lines:[
 ["Wiener Gambit mit ...d5","e4 e5 Nc3{Deckt e4 und bereitet f4 vor.} Nf6 f4{Der Gambitzug: Angriff auf e5.} d5{Beste Antwort: Gegenschlag im Zentrum.} fxe5 Nxe4 Nf3 Be7 d4 O-O Bd3"],
 ["Wiener Gambit angenommen","e4 e5 Nc3 Nf6 f4 exf4 e5{Vertreibt den Springer mit Tempo.} Ng8 Nf3 d6 d4{Weiß baut ein großes Zentrum.} dxe5 dxe5 Qxd1+ Nxd1 Nc6 Bxf4"],
 ["Gegen ...Sc6","e4 e5 Nc3 Nc6 Bc4{Der Läufer kommt auf die starke Diagonale.} Nf6 d3{Solide: e4 ist gedeckt.} Bc5 f4 d6 Nf3"],
 ["Gegen ...Lc5","e4 e5 Nc3 Bc5 Nf3 d6 d4{Greift e5 und den Läufer indirekt an.} exd4 Nxd4 Nf6 Be2"]
 ]},
{id:"ruy", name:"Spanische Partie", eco:"C60–C99", side:"w",
 ideas:["Lb5 greift den Verteidiger von e5 an.","Langfristiger Druck statt schneller Angriff.","Plan: c3 und d4, dann Figuren am Königsflügel."],
 lines:[
 ["Geschlossen mit ...a6","e4 e5 Nf3 Nc6 Bb5{Greift den Springer an, der e5 verteidigt.} a6 Ba4{Der Läufer bleibt auf der Diagonale.} Nf6 O-O Be7 Re1{Deckt e4.} b5 Bb3 d6 c3{Vorbereitung für d4 und ein Rückzugsfeld für den Läufer.} O-O h3{Verhindert ...Lg4.}"],
 ["Berliner Verteidigung","e4 e5 Nf3 Nc6 Bb5 Nf6 O-O{Der e4-Bauer ist indirekt gedeckt.} Nxe4 Re1{Greift den Springer an.} Nd6 Nxe5 Be7 Bf1 Nxe5 Rxe5 O-O d4"],
 ["Mit ...d6","e4 e5 Nf3 Nc6 Bb5 a6 Ba4 d6 c3{Wieder wird d4 vorbereitet.} Bd7 d4 Nf6 O-O"],
 ["Bird-Verteidigung 3...Sd4","e4 e5 Nf3 Nc6 Bb5 Nd4 Nxd4 exd4 O-O{Einfach rochieren, Weiß ist weiter entwickelt.} c6 Bc4 Nf6 Re1 d6 c3"]
 ]},
{id:"qg", name:"Damengambit", eco:"D06–D69", side:"w",
 ideas:["Mit c4 wird der schwarze d5-Bauer angegriffen.","Holt Schwarz den Bauern, bekommt Weiß ihn bequem zurück.","Plan: Druck auf d5 und Minoritätsangriff am Damenflügel."],
 lines:[
 ["Abgelehnt mit ...Le7","d4 d5 c4{Das Damengambit: Weiß will den d5-Bauern ablenken.} e6 Nc3 Nf6 Bg5{Fesselt den Springer.} Be7 e3 O-O Nf3 Nbd7 Rc1"],
 ["Vorsicht Elefantenfalle","d4 d5 c4 e6 Nc3 Nf6 Bg5 Nbd7 e3{Nicht cxd5 exd5 Sxd5?? wegen ...Sxd5! Lxd8 Lb4+ und Schwarz gewinnt eine Figur.} Be7 Nf3 O-O Rc1"],
 ["Angenommen","d4 d5 c4 dxc4 e3{Der Läufer holt sich den Bauern einfach zurück.} Nf6 Bxc4 e6 Nf3 c5 O-O"],
 ["Slawisch","d4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4 a4{Verhindert ...b5, das den Bauern halten würde.} Bf5 e3 e6 Bxc4 Bb4 O-O O-O"],
 ["Albins Gegengambit","d4 d5 c4 e5 dxe5 d4 Nf3 Nc6 g3{Später Lg2: Der Läufer übt Druck auf den Damenflügel aus.}"]
 ]},
{id:"english", name:"Englische Eröffnung", eco:"A10–A39", side:"w",
 ideas:["1.c4 kontrolliert d5 von der Seite.","Fianchetto mit g3 und Lg2 auf der langen Diagonale.","Flexibel: Das Zentrum wird später besetzt."],
 lines:[
 ["Gegen 1...e5","c4 e5 Nc3 Nf6 g3{Fianchetto: Lg2 kontrolliert die lange Diagonale.} d5 cxd5 Nxd5 Bg2{Der Läufer drückt auf d5 und b7.} Nb6 Nf3 Nc6 O-O Be7 d3"],
 ["Gegen Königsindisch-Aufbau","c4 Nf6 Nc3 g6 g3 Bg7 Bg2 O-O Nf3 d6 O-O"],
 ["Symmetrisch","c4 c5 Nc3 Nc6 g3 g6 Bg2 Bg7 Nf3 e6 O-O"]
 ]},
{id:"kg", name:"Königsgambit", eco:"C30–C39", side:"w",
 ideas:["Weiß opfert den f-Bauern für Entwicklung und die offene f-Linie.","Sf3 verhindert ...Dh4+.","Schneller Angriff auf f7."],
 lines:[
 ["Kieseritzky","e4 e5 f4{Opfert einen Bauern für schnelle Entwicklung und die f-Linie.} exf4 Nf3{Verhindert ...Dh4+.} g5 h4{Greift die Bauernkette sofort an.} g4 Ne5 Nf6 Bc4 d5 exd5 Bd6 d4"],
 ["Fischer-Verteidigung","e4 e5 f4 exf4 Nf3 d6 d4 g5 h4 g4 Ng1{Ungewöhnlich, aber Theorie: Der Springer kommt über e2 wieder.}"],
 ["Abgelehnt mit ...Lc5","e4 e5 f4 Bc5{Jetzt nicht fxe5?? wegen ...Dh4+.} Nf3{Entwickeln und e5 angreifen.} d6 c3{Plan d4.} Nf6 d4 exd4 cxd4 Bb4+ Bd2 Bxd2+ Nbxd2"],
 ["Falkbeer-Gegengambit","e4 e5 f4 d5 exd5 exf4 Nf3 Nf6 Bc4 Nxd5 O-O"]
 ]},
{id:"bishops", name:"Läuferspiel", eco:"C23–C24", side:"w",
 ideas:["2.Lc4 zielt sofort auf f7.","Flexibel: oft Übergang in die Italienische Partie.","Mit d3 bleibt e4 sicher gedeckt."],
 lines:[
 ["Gegen ...Sf6","e4 e5 Bc4{Der Läufer zielt sofort auf f7.} Nf6 d3{Deckt e4 und bleibt flexibel.} c6 Nf3 d5 Bb3"],
 ["Übergang ins Italienische","e4 e5 Bc4 Nc6 Nf3{Jetzt ist es eine Italienische Partie.} Nf6 d3 Bc5 c3"],
 ["Gegen ...Lc5","e4 e5 Bc4 Bc5 Nf3 d6 c3 Nf6 d4 exd4 cxd4 Bb4+ Bd2"]
 ]},
{id:"reti", name:"Réti-Eröffnung", eco:"A04–A09", side:"w",
 ideas:["1.Sf3 ist flexibel und kontrolliert e5 und d4.","Das Zentrum wird von der Seite mit c4 angegriffen.","Fianchetto mit g3 und Lg2."],
 lines:[
 ["Mit ...d4","Nf3{Flexibel: kontrolliert e5 und d4.} d5 c4{Greift das Zentrum von der Seite an.} d4 e3 Nc6 exd4 Nxd4 Nxd4 Qxd4 Nc3"],
 ["Mit ...e6","Nf3 d5 c4 e6 g3 Nf6 Bg2 Be7 O-O O-O b3"],
 ["Doppel-Fianchetto","Nf3 Nf6 g3 g6 Bg2 Bg7 O-O O-O d3 d6"],
 ["Schwarz nimmt c4","Nf3 d5 c4 dxc4 e3{Holt den Bauern mit Lxc4 zurück.} Nf6 Bxc4 e6 O-O"]
 ]},
// ======================= SCHWARZ =======================
{id:"scholar", name:"Abwehr gegen Schäfermatt", eco:"C20", side:"b",
 ideas:["Die frühe Dame greift f7 an: Ruhig bleiben und decken.","...g6 und ...Sf6 stoppen die Mattdrohungen.","Danach gewinnt Schwarz Tempi gegen die Dame."],
 lines:[
 ["Dh5 und Lc4","e4 e5 Qh5{Die Dame greift e5 und f7 an.} Nc6{Deckt e5.} Bc4 g6{Verhindert Dxf7#.} Qf3{Neue Mattdrohung auf f7.} Nf6{Deckt f7 und entwickelt.} Ne2 Bg7 Nbc3 d6{Der Angriff ist verpufft, Schwarz steht prima.}"],
 ["Lc4 zuerst, dann Db3","e4 e5 Bc4 Nc6 Qh5 g6 Qf3 Nf6 Qb3{Wieder auf f7.} Qe7{Deckt f7.} Nc3 Nd4{Greift die Dame an.} Qa4 c6"],
 ["Df3 früh","e4 e5 Qf3 Nf6{Blockiert die Dame und deckt f7.} Bc4 Nc6 Ne2 Bc5 d3 d6"]
 ]},
{id:"twoknights", name:"Zweispringerspiel (Schwarz)", eco:"C55–C59", side:"b",
 ideas:["3...Sf6 greift e4 an statt passiv zu verteidigen.","Gegen Sg5: ...d5 und ...Sa5, nicht ...Sxd5.","Gegen Sc3 hilft der Gabeltrick ...Sxe4 und ...d5."],
 lines:[
 ["Gegen Sg5","e4 e5 Nf3 Nc6 Bc4 Nf6{Gegenangriff auf e4.} Ng5{Weiß greift f7 an.} d5{Blockiert den Läufer.} exd5 Na5{Nicht ...Sxd5?! wegen Sxf7. Sa5 greift den Läufer an.} Bb5+ c6 dxc6 bxc6 Be2 h6 Nf3 e4 Ne5 Bd6"],
 ["Gegen ruhiges d3","e4 e5 Nf3 Nc6 Bc4 Nf6 d3 Bc5{Aktiv entwickeln.} c3 d6 O-O O-O Re1 a6 Bb3 Ba7"],
 ["Gabeltrick gegen Sc3","e4 e5 Nf3 Nc6 Bc4 Nf6 Nc3 Nxe4{Der Gabeltrick: Nach Sxe4 folgt ...d5.} Nxe4 d5{Gabel: Läufer und Springer hängen.} Bd3 dxe4 Bxe4 Bd6"],
 ["Gegen d4","e4 e5 Nf3 Nc6 Bc4 Nf6 d4 exd4 e5 d5{Gegenschlag im Zentrum.} Bb5 Ne4 Nxd4 Bd7 Bxc6 bxc6 O-O Bc5"],
 ["Gegen frühe Rochade","e4 e5 Nf3 Nc6 Bc4 Nf6 O-O Nxe4{Den Bauern nehmen ist hier gut.} Re1 d5 Bxd5 Qxd5 Nc3 Qa5 Nxe4 Be6"]
 ]},
{id:"giuoco_b", name:"Italienisch mit ...Lc5 (Schwarz)", eco:"C50–C54", side:"b",
 ideas:["3...Lc5: Spiegelbildlich entwickeln und f2 ins Visier nehmen.","Gegen c3 und d4 mit ...exd4 und ...Lb4+ reagieren.","Solide: ...d6, ...Sf6, kurze Rochade."],
 lines:[
 ["Gegen c3 und d4","e4 e5 Nf3 Nc6 Bc4 Bc5{Der Läufer zielt auf f2.} c3 Nf6{Greift e4 an.} d4 exd4 cxd4 Bb4+{Schach und Tausch erleichtern das Spiel.} Bd2 Bxd2+ Nbxd2 d5{Befreit sich im Zentrum.} exd5 Nxd5 Qb3 Nce7 O-O O-O"],
 ["Giuoco Pianissimo","e4 e5 Nf3 Nc6 Bc4 Bc5 d3 Nf6 c3 d6 O-O O-O"],
 ["Frühe Rochade","e4 e5 Nf3 Nc6 Bc4 Bc5 O-O Nf6 d3 d6 c3 O-O"],
 ["Gegen Sc3","e4 e5 Nf3 Nc6 Bc4 Bc5 Nc3 Nf6 d3 d6"],
 ["Evans-Gambit","e4 e5 Nf3 Nc6 Bc4 Bc5 b4{Das Evans-Gambit: Weiß opfert einen Bauern.} Bxb4{Nimm ihn.} c3 Ba5 d4 exd4 O-O Nge7"],
 ["Gegen frühes Sg5","e4 e5 Nf3 Nc6 Bc4 Bc5 Ng5 Nh6{Deckt f7.} d3 d6"]
 ]},
{id:"sicilian", name:"Sizilianische Verteidigung", eco:"B20–B99", side:"b",
 ideas:["1...c5 kämpft asymmetrisch um d4.","Nach d4 tauscht Schwarz mit ...cxd4 einen Flügel- gegen einen Zentrumsbauern.","Gegenspiel am Damenflügel über die halboffene c-Linie."],
 lines:[
 ["Offen, Najdorf-Aufbau","e4 c5{Asymmetrisch: Kampf um das Feld d4.} Nf3 d6 d4 cxd4 Nxd4 Nf6{Greift e4 an, Weiß muss decken.} Nc3 a6{Vielseitig: verhindert Sb5 und bereitet ...e5 vor.} Be2 e5 Nb3 Be7 O-O O-O"],
 ["Alapin 2.c3","e4 c5 c3 Nf6{Greift e4 an, bevor d4 kommt.} e5 Nd5 d4 cxd4 Nf3 Nc6 cxd4 d6"],
 ["Geschlossen mit f4","e4 c5 Nc3 Nc6 f4 g6 Nf3 Bg7 Bc4 e6{Schließt die Diagonale des Läufers nach f7.}"],
 ["Lb5+ (Moskauer Variante)","e4 c5 Nf3 d6 Bb5+ Bd7{Einfach dazwischenstellen und tauschen.} Bxd7+ Qxd7 O-O Nc6 c3 Nf6"],
 ["Morra-Gambit","e4 c5 d4 cxd4 c3 d5{Schwarz gibt den Bauern zurück und befreit sich.} exd5 Qxd5 cxd4 Nc6 Nf3 Bg4"],
 ["Frühe Dame 4.Dxd4","e4 c5 Nf3 d6 d4 cxd4 Qxd4 Nc6{Gewinnt ein Tempo gegen die Dame.} Bb5 Bd7 Bxc6 Bxc6 Nc3 Nf6"],
 ["Gegen 2.Lc4","e4 c5 Bc4 e6{Nimmt dem Läufer die Sicht auf f7.} Nf3 Nc6 d3 Nf6 O-O d5 Bb3 Be7"]
 ]},
{id:"french", name:"Französische Verteidigung", eco:"C00–C19", side:"b",
 ideas:["1...e6 und ...d5: festes Zentrum.","Gegen die Kette d4-e5 mit ...c5 und ...Sc6 Druck auf d4.","Problem: der helle Läufer c8, oft geht er über d7."],
 lines:[
 ["Vorstoßvariante","e4 e6{Bereitet ...d5 vor.} d4 d5 e5 c5{Greift die weiße Bauernkette an der Basis an.} c3 Nc6 Nf3 Qb6{Mehr Druck auf d4 und b2.} Bd3 cxd4 cxd4 Bd7{Nicht ...Sxd4?? Sxd4 Dxd4 Lb5+ und die Dame fällt.}"],
 ["Klassisch mit Lg5","e4 e6 d4 d5 Nc3 Nf6 Bg5 Be7 e5 Nfd7 Bxe7 Qxe7 f4 O-O Nf3 c5"],
 ["Abtauschvariante","e4 e6 d4 d5 exd5 exd5 Nf3 Nf6 Bd3 Bd6 O-O O-O"],
 ["Tarrasch 3.Sd2","e4 e6 d4 d5 Nd2 c5 exd5 Qxd5 Ngf3 cxd4 Bc4 Qd6 O-O Nf6"],
 ["Gegen 2.d3","e4 e6 d3 d5 Nd2 c5 Ngf3 Nc6 g3 Nf6 Bg2 Be7 O-O O-O"],
 ["Gegen 2.Sf3","e4 e6 Nf3 d5 e5 c5 d4 Nc6 c3 Qb6"]
 ]},
{id:"caro", name:"Caro-Kann-Verteidigung", eco:"B10–B19", side:"b",
 ideas:["1...c6 und ...d5: solide wie Französisch.","Der helle Läufer kommt vor ...e6 nach f5 oder g4.","Gute Bauernstruktur fürs Endspiel."],
 lines:[
 ["Vorstoßvariante","e4 c6{Bereitet ...d5 vor, ohne den hellen Läufer einzusperren.} d4 d5 e5 Bf5{Der Läufer kommt vor ...e6 heraus.} Nf3 e6 Be2 c5 O-O Nc6"],
 ["Klassisch 4...Lf5","e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5{Greift den Springer mit Tempo an.} Ng3 Bg6 h4 h6{Sonst fängt h5 den Läufer.} Nf3 Nd7 h5 Bh7 Bd3 Bxd3 Qxd3 e6"],
 ["Abtauschvariante","e4 c6 d4 d5 exd5 cxd5 Bd3 Nc6 c3 Nf6 Bf4 Bg4 Qb3 Qd7"],
 ["Zweispringer","e4 c6 Nf3 d5 Nc3 Bg4 h3 Bxf3 Qxf3 e6 d4 Nf6"],
 ["Gegen 2.Lc4","e4 c6 Bc4 d5{Greift den Läufer und e4 an.} exd5 cxd5 Bb3 Nf6 d4 Nc6"]
 ]},
{id:"scandi", name:"Skandinavische Verteidigung", eco:"B01", side:"b",
 ideas:["1...d5 greift e4 sofort an.","Die Dame geht nach a5 oder d6 und steht dort sicher.","Der helle Läufer kommt nach f5 oder g4, dann ...e6 und ...c6."],
 lines:[
 ["Hauptvariante ...Da5","e4 d5{Greift e4 sofort an.} exd5 Qxd5 Nc3 Qa5{Die Dame steht hier sicher und fesselt den Springer.} d4 Nf6 Nf3 Bf5{Der Läufer kommt vor ...e6 heraus.} Bc4 e6 Bd2 c6"],
 ["Gegen 3.Sf3","e4 d5 exd5 Qxd5 Nf3 Nf6 d4 Bf5 Be2 e6 O-O c6 c4 Qd8"],
 ["Gegen Lc4 und d3","e4 d5 exd5 Qxd5 Nc3 Qa5 Bc4 Nf6 d3 c6 Bd2 Bf5"],
 ["Gegen 2.e5","e4 d5 e5 Bf5{Der helle Läufer kommt raus, wie im Caro-Kann.} d4 e6 Nf3 c5 c3 Nc6 Be2 Qb6"],
 ["Gegen 2.Sc3","e4 d5 Nc3 d4{Vertreibt den Springer.} Nce2 e5 Ng3 Be6 Nf3 f6"],
 ["Gegen 3.d4","e4 d5 exd5 Qxd5 d4 Nf6 Nf3 Bg4 Be2 e6 O-O Nc6"]
 ]},
{id:"pirc", name:"Pirc und Moderne Verteidigung", eco:"B06–B09", side:"b",
 ideas:["Schwarz lässt Weiß das Zentrum und greift es später an.","Fianchetto mit ...g6 und ...Lg7.","Gegenschlag mit ...c5 oder ...e5."],
 lines:[
 ["Österreichischer Angriff","e4 d6 d4 Nf6{Greift e4 an.} Nc3 g6 f4 Bg7 Nf3 O-O Bd3 Na6 O-O c5"],
 ["150-Angriff mit Le3 und Dd2","e4 d6 d4 Nf6 Nc3 g6 Be3 c6 Qd2 b5{Gegenspiel am Damenflügel.} Bd3 Nbd7"],
 ["Klassisch","e4 d6 d4 Nf6 Nc3 g6 Nf3 Bg7 Be2 O-O O-O c6 a4 a5"],
 ["Moderne mit 1...g6","e4 g6 d4 Bg7 Nf3 d6 Bc4 Nf6 Qe2 O-O"],
 ["Gegen Ld3","e4 d6 d4 Nf6 Bd3 e5 c3 Be7 Nf3 O-O"]
 ]},
{id:"petrov", name:"Russische Verteidigung (Petrow)", eco:"C42", side:"b",
 ideas:["2...Sf6 greift e4 an statt e5 zu decken.","Nach Sxe5 erst ...d6, dann ...Sxe4.","Symmetrisch und sehr solide."],
 lines:[
 ["Hauptvariante","e4 e5 Nf3 Nf6{Greift e4 an statt e5 zu decken.} Nxe5 d6{Wichtig: erst den Springer vertreiben. ...Sxe4?? verliert nach De2.} Nf3 Nxe4 d4 d5 Bd3 Nc6 O-O Be7 Re1 Bg4"],
 ["3.d4","e4 e5 Nf3 Nf6 d4 exd4 e5 Ne4 Qxd4 d5 exd6 Nxd6 Bd3 Nc6"],
 ["Vierspringerspiel","e4 e5 Nf3 Nf6 Nc3 Nc6 Bb5 Bb4 O-O O-O d3 d6"],
 ["Cochrane-Opfer","e4 e5 Nf3 Nf6 Nxe5 d6 Nxf7{Ein riskantes Opfer.} Kxf7{Nimm die Figur.} d4 c5 dxc5 Nc6"],
 ["Gegen 3.Lc4","e4 e5 Nf3 Nf6 Bc4 Nxe4{Nimm den Bauern.} Nc3 Nxc3 dxc3 f6{Sichert e5 und schließt die Diagonale nach f7.}"]
 ]},
{id:"philidor", name:"Philidor-Verteidigung", eco:"C41", side:"b",
 ideas:["2...d6 deckt e5 solide.","Nach d4 oft ...exd4 und freies Figurenspiel.","Vorsicht vor Fallen auf f7, etwa dem Seekadettenmatt."],
 lines:[
 ["Hauptvariante","e4 e5 Nf3 d6{Deckt e5 solide.} d4 exd4{Gibt das Zentrum ab, bekommt aber freies Spiel.} Nxd4 Nf6 Nc3 Be7 Be2 O-O O-O Re8"],
 ["Gegen 3.Lc4","e4 e5 Nf3 d6 Bc4 Be7{Nicht ...Lg4?! wegen der Gefahr des Seekadettenmatts.} d4 exd4 Nxd4 Nf6 Nc3 O-O O-O"],
 ["Gegen 3.Sc3","e4 e5 Nf3 d6 Nc3 Nf6 d4 exd4 Nxd4 Be7 Be2 O-O"],
 ["Gegen frühe Dame","e4 e5 Nf3 d6 d4 exd4 Qxd4 Nc6{Tempo gegen die Dame.} Bb5 Bd7 Bxc6 Bxc6 Nc3 Nf6"]
 ]},
{id:"alekhine", name:"Aljechin-Verteidigung", eco:"B02–B05", side:"b",
 ideas:["1...Sf6 lockt den e-Bauern nach vorn.","Danach wird das weiße Zentrum mit ...d6 angegriffen.","Provokant, aber gut spielbar."],
 lines:[
 ["Moderne Variante","e4 Nf6{Lockt den e-Bauern nach vorn, um ihn später anzugreifen.} e5 Nd5 d4 d6{Greift das Zentrum an.} Nf3 Bg4 Be2 e6 O-O Be7 c4 Nb6 h3 Bh5"],
 ["Abtausch mit c4","e4 Nf6 e5 Nd5 c4 Nb6 d4 d6 exd6 cxd6 Nc3 g6 Be3 Bg7 Rc1 O-O"],
 ["Gegen 2.Sc3","e4 Nf6 Nc3 d5 e5 Nfd7 d4 e6 f4 c5 Nf3 Nc6"],
 ["Gegen 2.d3","e4 Nf6 d3 e5 Nf3 Nc6 Be2 d5"],
 ["Gegen 3.Sc3","e4 Nf6 e5 Nd5 Nc3 Nxc3 dxc3 d6 Nf3 Nc6"]
 ]},
{id:"center_b", name:"Gegen 2.d4 (Mittelgambit, Dänisch, Schottisch)", eco:"C21–C22 / C44–C45", side:"b",
 ideas:["Nach 2.d4 einfach ...exd4 schlagen.","Gegen eine frühe Dame mit ...Sc6 Tempo gewinnen.","Im Dänischen Gambit mit ...d5 den Bauern zurückgeben."],
 lines:[
 ["Mittelgambit","e4 e5 d4 exd4{Nimm den Bauern.} Qxd4 Nc6{Gewinnt ein Tempo gegen die Dame.} Qe3 Nf6 Nc3 Bb4 Bd2 O-O O-O-O Re8"],
 ["Dänisches Gambit","e4 e5 d4 exd4 c3 d5{Die sichere Antwort: Schwarz gibt den Bauern zurück.} exd5 Qxd5 cxd4 Nc6 Nf3 Bg4 Be2 Bb4+ Nc3 Bxf3 Bxf3 Qc4"],
 ["Schottisch Vierspringer","e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Nf6 Nc3 Bb4 Nxc6 bxc6 Bd3 d5"],
 ["Schottisches Gambit","e4 e5 Nf3 Nc6 d4 exd4 Bc4 Nf6 e5 d5 Bb5 Ne4 Nxd4 Bd7"]
 ]},
{id:"qgd", name:"Damengambit abgelehnt (Schwarz)", eco:"D30–D69", side:"b",
 ideas:["1...d5 und ...e6: d5 bleibt fest.","Ruhige Entwicklung mit ...Le7, ...O-O, ...Sbd7.","Befreiung mit ...c5 oder ...dxc4 und ...e5."],
 lines:[
 ["Orthodox","d4 d5{Schwarz beansprucht das Zentrum.} c4 e6{Hält d5 fest, das Gambit wird abgelehnt.} Nc3 Nf6 Bg5 Nbd7{Stellt nebenbei die Elefantenfalle.} e3 Be7 Nf3 O-O Rc1 c6 Bd3 dxc4 Bxc4 Nd5"],
 ["Elefantenfalle","d4 d5 c4 e6 Nc3 Nf6 Bg5 Nbd7 cxd5 exd5 Nxd5{Ein Fehler: Der Springer sieht frei aus.} Nxd5{Schwarz opfert die Dame.} Bxd8 Bb4+{Schach! Weiß muss die Dame zurückgeben.} Qd2 Bxd2+ Kxd2 Kxd8{Schwarz hat eine Figur mehr.}"],
 ["Abtausch früh","d4 d5 c4 e6 Nc3 Nf6 cxd5 exd5 Bg5 Be7 e3 c6 Qc2 Nbd7 Bd3 O-O"],
 ["Katalanisch","d4 d5 c4 e6 Nf3 Nf6 g3 Be7 Bg2 O-O O-O dxc4 Qc2 a6"],
 ["Gegen das Londoner System","d4 d5 Bf4 Nf6 e3 c5{Sofortiger Gegenschlag gegen d4.} c3 Nc6 Nd2 e6 Ngf3 Bd6"],
 ["Gegen Colle mit Sf3 und e3","d4 d5 Nf3 Nf6 e3 e6 Bd3 c5 b3 Nc6 O-O Bd6 Bb2 O-O"],
 ["Gegen Stonewall","d4 d5 e3 Nf6 Bd3 c5 c3 Nc6 f4 Bg4 Nf3 e6"]
 ]},
{id:"slav_b", name:"Slawische Verteidigung (Schwarz)", eco:"D10–D19", side:"b",
 ideas:["2...c6 deckt d5 mit einem Bauern.","Der Läufer c8 bleibt frei und kommt nach f5.","Sehr solide Bauernstruktur."],
 lines:[
 ["Hauptvariante","d4 d5 c4 c6{Deckt d5 mit einem Bauern und lässt den Läufer c8 frei.} Nf3 Nf6 Nc3 dxc4 a4 Bf5{Der Läufer kommt vor ...e6 heraus.} e3 e6 Bxc4 Bb4 O-O O-O Qe2 Nbd7"],
 ["Abtauschvariante","d4 d5 c4 c6 cxd5 cxd5 Nc3 Nf6 Bf4 Nc6 e3 Bf5 Nf3 e6"],
 ["Halbslawisch","d4 d5 c4 c6 e3 Nf6 Nc3 e6 Nf3 Nbd7 Bd3 dxc4 Bxc4 b5 Bd3 Bb7"]
 ]},
{id:"kid", name:"Königsindische Verteidigung", eco:"E60–E99", side:"b",
 ideas:["Weiß bekommt das Zentrum, Schwarz greift es mit ...e5 an.","Fianchetto: Der Läufer g7 wird sehr stark.","Plan in vielen Varianten: ...f5 und Königsangriff."],
 lines:[
 ["Klassisch","d4 Nf6 c4 g6{Fianchetto: Der Läufer wird auf g7 sehr stark.} Nc3 Bg7 e4 d6 Nf3 O-O Be2 e5{Der typische Hebel gegen das weiße Zentrum.} O-O Nc6 d5 Ne7{Plan: ...Se8, ...f5 und Königsangriff.}"],
 ["Gegen das Londoner System","d4 Nf6 Nf3 g6 Bf4 Bg7 e3 O-O Be2 d6 O-O Nbd7"],
 ["Fianchetto-Variante","d4 Nf6 c4 g6 g3 Bg7 Bg2 O-O Nf3 d6 O-O Nbd7 Nc3 e5"],
 ["Sämisch","d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Be3 e5 d5 Nh5"],
 ["Vierbauernangriff","d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f4 O-O Nf3 c5 d5 e6"],
 ["Gegen 2.Lf4","d4 Nf6 Bf4 g6 e3 Bg7 Nf3 O-O Be2 d6 O-O Nbd7"]
 ]},
{id:"nimzo", name:"Nimzowitsch-Indisch", eco:"E20–E59", side:"b",
 ideas:["3...Lb4 fesselt den Springer c3 und kämpft um e4.","Schwarz tauscht oft auf c3 und verdoppelt die weißen Bauern.","Gegen 3.Sf3 eignet sich Damenindisch mit ...b6."],
 lines:[
 ["Rubinstein 4.e3","d4 Nf6 c4 e6 Nc3 Bb4{Fesselt den Springer und kämpft um e4.} e3 O-O Bd3 d5 Nf3 c5 O-O Nc6 a3 Bxc3 bxc3 dxc4 Bxc4 Qc7"],
 ["Klassisch 4.Dc2","d4 Nf6 c4 e6 Nc3 Bb4 Qc2 O-O a3 Bxc3+ Qxc3 b6 Bg5 Bb7 f3 h6 Bh4 d5"],
 ["Damenindisch gegen 3.Sf3","d4 Nf6 c4 e6 Nf3 b6 g3 Ba6 b3 Bb4+ Bd2 Be7 Bg2 c6"],
 ["Gegen 3.g3","d4 Nf6 c4 e6 g3 d5 Bg2 Be7 Nf3 O-O O-O dxc4"],
 ["Kmoch 4.f3","d4 Nf6 c4 e6 Nc3 Bb4 f3 d5 a3 Be7 e4 dxe4 fxe4 e5 d5 Bc5"]
 ]},
{id:"grunfeld", name:"Grünfeld-Indisch", eco:"D70–D99", side:"b",
 ideas:["3...d5: sofortiger Schlag gegen das Zentrum.","Weiß bekommt ein großes Zentrum, Schwarz greift es mit ...c5 und Lg7 an.","Dynamisch und aktiv."],
 lines:[
 ["Abtauschvariante","d4 Nf6 c4 g6 Nc3 d5{Grünfeld: Der Schlag gegen das Zentrum.} cxd5 Nxd5 e4 Nxc3 bxc3 Bg7{Der Läufer drückt auf c3 und d4.} Nf3 c5 Be3 Qa5 Qd2 O-O"],
 ["Russisches System","d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Qb3 dxc4 Qxc4 O-O e4 Bg4"],
 ["Gegen 4.Lf4","d4 Nf6 c4 g6 Nc3 d5 Bf4 Bg7 e3 O-O Rc1 c5"]
 ]},
{id:"dutch", name:"Holländische Verteidigung", eco:"A80–A99", side:"b",
 ideas:["1...f5 kontrolliert e4.","Oft Königsangriff über die f-Linie.","Der König steht etwas luftiger: Vorsicht auf der Diagonale e8-h5."],
 lines:[
 ["Leningrader System","d4 f5{Kontrolliert e4 und bereitet einen Königsangriff vor.} g3 Nf6 Bg2 g6 Nf3 Bg7 O-O O-O c4 d6 Nc3 Qe8 d5 a5"],
 ["Gegen Lf4-Aufbau","d4 f5 Nf3 Nf6 Bf4 e6 e3 Be7 Bd3 O-O O-O b6"],
 ["Staunton-Gambit","d4 f5 e4 fxe4 Nc3 Nf6 Bg5 Nc6 d5 Ne5 Qd4 Nf7"],
 ["Klassisch mit c4","d4 f5 c4 Nf6 Nc3 e6 Nf3 Be7 e3 O-O Bd3 d5"]
 ]}
];
