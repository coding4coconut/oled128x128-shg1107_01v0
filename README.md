
> Diese Seite bei [https://coding4coconut.github.io/oled128x128-shg1107_01v0/](https://coding4coconut.github.io/oled128x128-shg1107_01v0/) öffnen

## Beschreibung

Dieses PXT-Paket dient zur Steuerung von **OLED-Displays** mit einem **S01107-Chipsatz** und 128x128 Pixel an einem Calliope mini.
Ich verwende dazu ein 1.12'' OLED Disply mit **Grove-Schnittstelle** von seeed (Hardwareversion v2.1). Wichtige Eckdaten des Displays:
   * Interface: Grove -> I2C
   * Farbe: einfarbiges Display
   * Controller: SH1107
   * Resolution: 128 x 128 (Pixel)

https://wiki.seeedstudio.com/Grove-OLED_Display_1.12inch/

![image](https://user-images.githubusercontent.com/91993589/174493006-810a9e61-dbf1-414f-959e-104159703b17.png)


Bei diesem 1.12'' OLED-Display-Typ von seeed gibt es auch eine ältere Version (Version v1.0), welche mit einem SSD1327 Chip bestückt sind.
Für diese ältere Version des OLED-Displays wird daher eine andere Erweiterung benötigt, da diese Erweiterung nur für die neueren Versionen mit SH1107-Chipsatz funktioniert.

Diese Erweiterung basiert auf einer microbit-Erweiterung von https://github.com/Microbit-Grove-Library/pxt-OledDisplay
Diese microbit-Erweiterung läuft jedoch nicht auf dem Calliope mini.
Es wurden daher die Treiberanpassungen für den Calliope mini vorgenommen und eine neue PXT-Erweiterung erstellt.
U.a. wurde die Initialisierung des Chipsatzes angepasst sowie Funktionen für die Kontrasteinstellung, Display-Ausrichtung, Hintergrundmodus erstellt.

Weiterhin wurde der Zeichensatz ausgetauscht, da dieser immer zu Abstürzen führte.

Vielen Dank an **Michael Klein**  @https://github.com/MKleinSB - der neue Zeichensatz mit Erweiterung für deutsche Umlaute kommt von:
https://github.com/MKleinSB/pxt-OLED-SSD1306
MIT License Copyright (c) 2019 Michael Klein


## Initialisierung und erster Test

![image](https://user-images.githubusercontent.com/91993589/174495154-84380dcf-a531-42a0-ac62-c520feea4e4e.png)


Zur Inbetriebnahme des OLED-Displays ist es wichtig das Display zunächst zu Iinitialisieren und den Speicher des Displays zu löschen.

![image](https://user-images.githubusercontent.com/91993589/174494856-bc45937f-3b4a-4a66-8c67-e82f62f7071b.png)


## Wichtige Funktionen der Erweiterung

### Startpunkt setzen

![image](https://user-images.githubusercontent.com/91993589/174493397-f59c0c93-8be7-4eb1-a6f9-f003fa7dd466.png)

Um den Text an eine bestimmte Stelle im Display zu schreiben, muss vorher der Cursor auf die entsprechende Startposition gestellt werden.
   * Reihe: 0 - 15 -> in vertikaler Achse wird das Display in Reihen (Zeilen) angesprochen. Eine Reihe(Zeile) hat 8 Pixel in der Höhe. 
                      Ein Textzeichen hat auch eine Höhe von 8 Pixel. D.h. es kann ein Text also Reihe für Reihe genau untereinander geschrieben werden.
   * Spalte: 0 - 127 -> auf horizontaler Achse erfolgt die Positionierung von 0 bis 127. Jede Spalte hat eine Breite von 1 Pixel.

### Text ausgeben

![image](https://user-images.githubusercontent.com/91993589/174493574-b078b5c1-fdfc-488d-b834-96040d6fae07.png)

Hier können Sie einen beliebigen Text eingeben, welcher auf dem Display ausgegeben werden soll.

**WICHTIG:** 
Das Display erledigt **keine automatischen Zeilenumbrüche**. D.h. Zeilenumbrüche müssen manuel programmiert werden - dazu wird einfach ein neuer Startpunkt gesstetzt und der Cursor einfach auf eine neue Zeile gesetzt -> siehe "Startpunkt setzen"

### Zahl ausgeben

![image](https://user-images.githubusercontent.com/91993589/174493688-1b0a5ef5-8e5a-4cd1-9eaa-33ee5c3cffb6.png)

Dieser Block gibt eine Integer-Zahl aus. 
Die Ausgabe erfolgt an der **aktuellen Cursor-Position**. Ggf. muss vorher der Cursor auf die gewünschte Position gesetz werden -> siehe "Startpunkt setzen"

### Horizontale oder vertikale Linien zeichnen

![image](https://user-images.githubusercontent.com/91993589/174494810-5289fafd-d6de-42db-a375-ca1abebc2de6.png)


Um eine horizontale oder vertikale Line auf dem Display zu zeichen, muss jeweils der Startpunkt der Linie und die Länge der Linie festgelegt werden.
   * X : horizontaler Startpunkt -> 0 - 127 -> legt fest, bei welchem Pixel in horizontaler Richtung gestartet werden soll
   * Y : vertikaler Startpunkt -> 0 - 127 -> legt fest, bei welchem Pixel in vertikaller Richtung gestartet werden soll
   * Länge: Festlegung der Linienlänge über Anzahl in Pixels -> 0 - 127 

### Display drehen

![image](https://user-images.githubusercontent.com/91993589/174493867-154312d7-42b8-45d5-89be-d5acd77aee94.png)

Mit diesem Befehlsblock wird die Displayausrichtung um 180° gedreht. 
Dies kann hilfreich sein, wenn das Display beim Einbau "auf dem Kopf steht". 
Dann kann mit diesem Befehl das Display die Ausrichtung um 180° gedreht werden um das Display wieder in richtiger Ausrichtung zu haben.

### Rechtecke zeichnen

![image](https://user-images.githubusercontent.com/91993589/174494704-026b3d2f-face-4393-9809-5a8eca25a4c1.png)

Mit diesem Block können Rechtecke auf dem Display gezeichnet werden.
Dazu werden jeweils die Koordinaten für das rechte oberer Eck des Rechtecks (von X bis Y) und das linke untere Eck des Rechtecks (bis X und Y) festgelegt.
   * X : 0 - 127 -> legt fest, bei welchem Pixel in horizontaler Richtung gestartet werden soll
   * Y : 0 - 127 -> legt fest, bei welchem Pixel in vertikaller Richtung gestartet werden soll




## License
MIT License

See License-file

MIT License Copyright (c) 2022 Franz Xaver Stolz

## Laufzeitumgebung zur Erstellung dieser Erweiterung
Diese Erweiterung wurde mit folgenden Versionen des MakeCode-Editors und Laufzeitumgebung erstellt und getestet:
*makecode.calliope.cc Version:  4.0.25
*Microsoft MakeCode Version:  7.0.16
*Laufzeitumgebung calliope Version:  v2.2.0-rc6-calliope.rc3-iss0.3
*Calliope mini Hardware-Veresion v2.0

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

* for PXT/calliopemini OLED SH1107 Grove calliope
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>

