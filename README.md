
> Diese Seite bei [https://coding4coconut.github.io/oled128x128-shg1107_01v0/](https://coding4coconut.github.io/oled128x128-shg1107_01v0/) öffnen

## Beschreibung

Dieses PXT-Paket dient zur Steuerung von OLED-Displays mit einem S01107-Chipsatz und 128x128 Pixel an einem Calliope mini.
Ich verwende dazu ein 1.12'' OLED Disply mit Grove-Schnittstelle von seeed (Hardwareversion v2.1). Wichtige Eckdaten des Displays:
   * Interface: Grove -> I2C
   * Farbe: einfarbiges Display
   * Controller: SH1107
   * Resolution: 128 x 128 (Pixel)

https://wiki.seeedstudio.com/Grove-OLED_Display_1.12inch/



Bei diesem 1.12'' OLED-Display Type von seed gibt es auch eine ältere Version (Version v1.0), welche mit einem SSD1327 Chip bestückt sind.
Für diese ältere Version des OLED-Displays wird daher eine andere Erweiterung benötigt, da diese Erweiterung nur für die neueren Versionen mit SH1107 Chipsatz funktioniert.

Diese Erweiterung basiert auf einer microbit-Erweiterung von https://github.com/Microbit-Grove-Library/pxt-OledDisplay
Diese microbit-Erweiterung läuft jedoch nicht auf dem Calliope mini.
Es wurden daher die Treiberanpassungen für den Calliope mini vorgenommen und eine neue PXT-Erweiterung erstellt.
U.a. wurde die Initialisierung des Chipsatzes angepasst sowie Funktionen für die Kontrasteinstellung, Display-Ausrichtung, Hintergrundmodus erstellt.
Weiterhin wurde der Zeichensatz ausgetauscht, da dieser immer zu Abstürzen führte.
Vielen Dank an Michael Klein - der neue Zeichensatz mit Erweiterung für deutsche Umlaute kommt von:
https://github.com/MKleinSB/pxt-OLED-SSD1306
MIT License Copyright (c) 2019 Michael Klein


#### Metadaten (verwendet für Suche, Rendering)

* for PXT/calliopemini OLED SH1101 Grove
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>

## License
MIT License

See License-file

MIT License Copyright (c) 2022 Franz Xaver Stolz

## Laufzeitumgebung zur Erstellung dieser Erweiterung
Diese Erweiterung wurde mit folgenden Versionen des MakeCode-Editors und Laufzeitumgebung erstellt und getestet:
*makecode.calliope.cc Version:  4.0.25
*Microsoft MakeCode Version:  7.0.16
*Laufzeitumgebung calliope Version:  v2.2.0-rc6-calliope.rc3-iss0.3


## Als Erweiterung verwenden

Dieses Repository kann als **Erweiterung** in MakeCode hinzugefügt werden.

* öffne [https://makecode.calliope.cc/](https://makecode.calliope.cc/)
* klicke auf **Neues Projekt**
* klicke auf **Erweiterungen** unter dem Zahnrad-Menü
* nach **https://github.com/coding4coconut/oled128x128-shg1107_01v0** suchen und importieren

## Dieses Projekt bearbeiten ![Build Status Abzeichen](https://github.com/coding4coconut/oled128x128-shg1107_01v0/workflows/MakeCode/badge.svg)

Um dieses Repository in MakeCode zu bearbeiten.

* öffne [https://makecode.calliope.cc/](https://makecode.calliope.cc/)
* klicke auf **Importieren** und dann auf **Importiere URL**
* füge **https://github.com/coding4coconut/oled128x128-shg1107_01v0** ein und klicke auf Importieren


#### Metadaten (verwendet für Suche, Rendering)

* for PXT/calliopemini
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
