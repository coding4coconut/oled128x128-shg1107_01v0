input.onButtonPressed(Button.A, function () {
    groveoleddisplay.drawVLine(0, 120, 128)
})
input.onButtonPressed(Button.AB, function () {
    groveoleddisplay.setContrast(10)
    groveoleddisplay.setTextXY(10, 0)
    groveoleddisplay.putNumber(16)
    groveoleddisplay.putNumber(333)
    CounterSTRING = convertToText(Counter)
    groveoleddisplay.writeString(CounterSTRING)
})
input.onButtonPressed(Button.B, function () {
    groveoleddisplay.setContrast(255)
    groveoleddisplay.drawRec(
    90,
    10,
    120,
    120
    )
})
let CounterSTRING = ""
let Counter = 0
Counter = 300
CounterSTRING = "111"
groveoleddisplay.init()
groveoleddisplay.clearDisplay()
groveoleddisplay.drawHLine(20, 20, 100)
basic.showIcon(IconNames.Happy)
groveoleddisplay.setTextXY(8, 5)
groveoleddisplay.writeString("HELLO XAVER äß")
basic.forever(function () {
	
})
