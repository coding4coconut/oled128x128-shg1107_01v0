input.onButtonPressed(Button.A, function () {
    groveOledDisplay.flipDisplay(true)
    UpSide = 1
    basic.showIcon(IconNames.ArrowSouth)
    groveOledDisplay.setBackground(BckColor.WHITE)
    groveOledDisplay.writeString("HELLO XAVER äß")
    groveOledDisplay.drawVLine(0, 120, 128)
})
input.onButtonPressed(Button.AB, function () {
    groveOledDisplay.setContrast(10)
    groveOledDisplay.setTextXY(10, 0)
    CounterSTRING = convertToText(Counter)
    groveOledDisplay.writeString(CounterSTRING)
    groveOledDisplay.drawPixel(30, 8, 1)
})
input.onButtonPressed(Button.B, function () {
    groveOledDisplay.setContrast(255)
    groveOledDisplay.flipDisplay(false)
    groveOledDisplay.drawPixel(10, 8, 1)
    groveOledDisplay.drawRec(
    90,
    10,
    120,
    120
    )
    groveOledDisplay.writeString("HELLO XAVER äß")
    UpSide = 0
    basic.showIcon(IconNames.ArrowNorth)
    groveOledDisplay.setBackground(BckColor.BLACK)
})
let UpSide = 0
let CounterSTRING = ""
let Counter = 0
Counter = 754
CounterSTRING = "111"
groveOledDisplay.init()
groveOledDisplay.clearDisplay()
groveOledDisplay.drawHLine(20, 20, 100)
basic.showIcon(IconNames.Happy)
groveOledDisplay.setTextXY(8, 5)
groveOledDisplay.writeString("HELLO XAVER äß")
groveOledDisplay.setTextXY(9, 5)
groveOledDisplay.putNumber(432)
groveOledDisplay.drawPixel(16, 50, 1)
