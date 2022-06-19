input.onButtonPressed(Button.A, function () {
    groveOledDisplay.drawVLine(0, 120, 128)
    groveOledDisplay.flipDisplay(true)
    UpSide = 1
})
input.onButtonPressed(Button.AB, function () {
    groveOledDisplay.setContrast(10)
    groveOledDisplay.setTextXY(10, 0)
    CounterSTRING = convertToText(Counter)
    groveOledDisplay.writeString(CounterSTRING)
})
input.onButtonPressed(Button.B, function () {
    groveOledDisplay.setContrast(255)
    groveOledDisplay.drawRec(
    90,
    10,
    120,
    120
    )
    groveOledDisplay.flipDisplay(false)
    UpSide = 0
})
let UpSide = 0
let CounterSTRING = ""
let Counter = 0
Counter = 300
CounterSTRING = "111"
groveOledDisplay.init()
groveOledDisplay.clearDisplay()
groveOledDisplay.drawHLine(20, 20, 100)
basic.showIcon(IconNames.Happy)
groveOledDisplay.setTextXY(8, 5)
groveOledDisplay.writeString("HELLO XAVER äß")
