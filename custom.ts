/**
 * Provides functions to control any OLED display (128x128) with a SH1107 chip along with Calliope Mini and I2C-interface
 */
// Maincode from https://github.com/Microbit-Grove-Library/pxt-OledDisplay
// MIT License Copyright (c) 2018 Seeed Technology Inc
//
// Thanks to Michael Klein for the regular character code and the ExtendedCharactersCode
// https://github.com/MKleinSB/pxt-OLED-SSD1306
// MIT License Copyright (c) 2019 Michael Klein
//
// Changes by Franz Stolz 17.06.2022
// MIT License Copyright (c) 22 Franz Stolz


/**
 * Functions to operate a OLED-module (128x128) with a SH1107 driver that is connected to grove interface (I2C-Interface)
 */
//% weight=10 color=#9F79EE icon="\uf108" block="OLED-Display SH1107"
namespace groveOledDisplay {
    
    // Defined bit pattern for adressing the SH1107 ship via I2C
    const DATAMODE = 0x4000 // Coding for the command byte in order to set OLED-display into "Data Mode"
    const COMMANDMODE = 0x0000 // Coding for the command byte in order to set OLED-display into "command mode"
    const OLEDADDRESS = 0x3c // reflects the I2C-address for the OLED DisplayMode

    // set the oled display to Data Mode and send one data byte to the oled display
    function sendData(data:number) {
       
        pins.i2cWriteNumber(OLEDADDRESS, DATAMODE + data, NumberFormat.UInt16BE, false);
    }
    // set the oled display to Command Mode and send one command byte to the oled display
    function sendCommand(cmd:number) {
        
        pins.i2cWriteNumber(OLEDADDRESS, COMMANDMODE + cmd, NumberFormat.UInt16BE, false);
    }    

    /**
     * Writes a single character to the display.
    */
    function putChar(c: string) {
        let c1 = c.charCodeAt(0);
        switch (c1) {
            case 196: writeCustomChar(extendedCharacters[0]); break;
            case 214: writeCustomChar(extendedCharacters[1]); break;
            case 220: writeCustomChar(extendedCharacters[2]); break;
            case 228: writeCustomChar(extendedCharacters[3]); break;
            case 246: writeCustomChar(extendedCharacters[4]); break;
            case 252: writeCustomChar(extendedCharacters[5]); break;
            case 223: writeCustomChar(extendedCharacters[6]); break;
            case 172: writeCustomChar(extendedCharacters[7]); break;
            case 176: writeCustomChar(extendedCharacters[8]); break;
            default:
                if (c1 < 32 || c1 > 127) //Ignore non-printable ASCII characters. This can be modified for multilingual font.
                {
                    writeCustomChar("\x00\xFF\x81\x81\x81\xFF\x00\x00");
                } else {
                    writeCustomChar(basicFont[c1 - 32]);
                }
        }
    }

    /**
     * Writes a string at the current cursor position at the display.
     */
    //% blockId=grove_write_string
    //% block="schreibe %s|auf das Display"
    //% s.defl="Hello"
    //% weight=90
    export function writeString(s: string) {
        for (let c of s) {
            putChar(c);
        }
    }

    /**
     * Writes a custom character to the display
     * at the current cursor position.
     * A character is a string of 8 bytes. Each byte represesnts
     * a line of the character. The eight bits of each byte
     * represent the pixels of a line of the character.
     * Ex. "\x00\xFF\x81\x81\x81\xFF\x00\x00"
     * ! ! ! Only use in Javascriptmode! In Blockmode Makecode adds 
     * extra backslashes. ! ! ! 
    */
    //% blockId=grove_write_custom_char 
    //% advanced=true
    //% block="schreibe eigenes Zeichen %c"
    //% weight=61
    //% advanced=true
    export function writeCustomChar(c: string) {
        for (let i = 0; i < 8; i++) {
            sendData(c.charCodeAt(i));
        }
    }

        
        /**
         * Initialize the OLED Display
        */
        //% blockId=grove_oled_init 
        //% block="inititialisiere OLED Display"
        //% advanced=false
        //% weight=100
        export function init() {
            sendCommand(0xae);  // Display OFF 
            //sendCommand(0xd5);  // Set Dclk
            //sendCommand(0x50);  // 100Hz
            sendCommand(0x20);  // Set row address
            sendCommand(0x81);  // Set contrast control
            sendCommand(0x80);  // contrast value
            //sendCommand(0xa0);  // Segment remap
            sendCommand(0xa4);  // Set Entire Display ON 
            sendCommand(0xa6);  // Normal display
            //sendCommand(0xad);  // Set external VCC
            //sendCommand(0x80);
            //sendCommand(0xc0);  // Set Common scan direction
            //sendCommand(0xd9);  // Set phase leghth
            //sendCommand(0x1f);
            //sendCommand(0xdb);  // Set Vcomh voltage
            //sendCommand(0x27);
            sendCommand(0xaf);  // Display ON
            sendCommand(0xb0);  // set the current cursor postition to x=0
            sendCommand(0x00);  // set the current cursor postition to Y=0
            sendCommand(0x11);  // set the current cursor postition to Y=0
        }

        /**
         * Set cursor position at the diplay
         * @param row which row to display - range from 0 to 15
         * @param col which col to display - range from 0 to 127
        */
        //% blockId=grove_oled_set_text_xy 
        //% block="setzte Cursor auf Reihe|%row|und Spalte|%col"
        //% row.min=0 row.max=15
        //% col.min=0 col.max=127
        //% weight=91
        export function setTextXY(row:number, col:number) {
            let col_l = col % 16;
            let col_h = (col / 16)+0x10;

            sendCommand(0xb0+row);
            sendCommand(col_l);
            sendCommand(col_h);
        }

        
        /**
         * Flip the dispay up side down
         * @param direction Down to flip the display and Up to turn back to normal direction 
         */
        //% blockId=grove_oled_flip_display 
        //% block="drehe Display $direction"
        //% direction.shadow="toggleYesNo"
        //% weight=85
        export function flipDisplay(direction:boolean) {  
            if (direction){
                sendCommand(0xA1);
                sendCommand(0xC8);
                basic.showIcon(IconNames.ArrowSouth);
            } 
            else {
                sendCommand(0xA0);
                sendCommand(0xC0);
                basic.showIcon(IconNames.ArrowNorth);
            }     

        }    

        /**
         * Clear entire display
        */
        //% blockId=grove_oled_clear_display 
        //% block="loesche Display"
        //% weight=99
        export function clearDisplay() {
            for(let i=0; i<16;i++){
                sendCommand(0xb0+i);
                sendCommand(0x0);
                sendCommand(0x10);
                for(let j=0; j<128;j++){ 
                    sendData(0x00);  
                }
            }
        }

       
        /**
         * Display an integer number at the current cursor position
         * @param num an integer number to display.
        */
        //% blockId=grove_oled_put_number 
        //% block="schreibe Zahl |%num|"
        //% weight=89
        export function putNumber(num:number) {
            
            writeString("" + num);
        } 

        /**
         * Adjust the contrast of the display
         * @param num contrast value from 0 to 255.
        */
        //% blockId=grove_oled_set_contrast 
        //% block="verändere Display-Kontrast |%num|"
        //% num.min=0 num.max=255
        //% num.defl=80
        //% advanced=true
        //% weight=62
        export function setContrast(num:number) {
                let TempCont = num
                
                if (num < 0) {
                    TempCont = 0;
                } else if (num > 255) {
                    TempCont = 255;
                } else {
                    TempCont = num;
                }
                pins.i2cWriteNumber(
                OLEDADDRESS,
                0x81,
                NumberFormat.UInt16BE,
                true
                );
                pins.i2cWriteNumber(
                OLEDADDRESS,
                TempCont,
                NumberFormat.UInt16BE,
                false
                );
        } 

        /**
         * Display a bitmap (max. 32x32 pixels)
         * @param x_start horizontal start position (upper left corner of the bitmap)
         * @param y_start vertical start position (upper left corner of the bitmap)
         * @param row_number vertical size of the bitmap in number of rows (max 4 rows = 32pixel)
         * @param column_number horizontal size of the bitmap in number of pixels (max 32pixel)
         * @param bitmap array with bitmap data 
        */
        //% blockId=grove_oled_draw_bitmap 
        //% block="zeichne bitmap bei row|%x_start|und column|%y_start|, size: row|%row_number|und column|%column_number|, bitmap:|%bitmap|"
        //% x.min=0 x.max=15
        //% y.min=0 y.max=127
        //% row_number.min=0 row_number.max=4
        //% column_number.min=0 column_number.max=32
        //% advanced=true
        //% weight=59
        export function drawBitmap(x_start:number,y_start:number,row_number:number,column_number:number,bitmap:number[]) {
            let x_end = x_start+row_number;
            let y_end = y_start+column_number;
            if (x_end > 16) x_end = 16;
            if (y_end > 128) y_end = 128;
            let x_offset = 0;
            let y_offset = 0;

            for (let i=x_start; i<x_end; i++) {
                y_offset = 0;
                for (let j=y_start; j<y_end; j++) {
                    let temp_byte = bitmap[column_number*x_offset+y_offset];
                    y_offset++;
                    sendCommand(0xb0+i);
                    sendCommand(j % 16);
                    sendCommand(j/16 + 0x10);
                    sendData(temp_byte);
                }
                x_offset ++ ;
            }
            
        }
        
        // function to draw a single pixel at the display
        function drawPixel(x: number, y:number, data:number) {
            let xTemp = x;
            let yTemp = y
            let dataTemp = data
            if (x<0) xTemp = 0;
            else if (x>127) xTemp = 127;
            if (y<0) y = 0;
            else if (y>127) yTemp = 127;
            if (data < 0) dataTemp = 0;
            else if (data > 255) dataTemp = 255;

            setTextXY(xTemp/8,yTemp);
            sendData(dataTemp);
        }

        /**
         * Draw a horizontal line
         * @param x defines the horizontal (x) start position for the line
         * @param y defines the vertical (y) start position for the line
         * @param len defines the length of the line in number of pixels
        */
        //% blockId=grove_oled_draw_hline 
        //% block="zeichne horizontale Linie ab x|%x|und y|%y|mit Länge|%len|"
        //% weight=70
        //% y.min=0 y.max=127
        //% x.min=0 x.max=127
        //% len.min=1 len.max=128
        export function drawHLine(x: number, y: number, len: number) {
            let y_max = y + len;
            if (y_max > 128) y_max = 128;
            for (let i=y;i<y_max;i++) {
                drawPixel(x,i,0x01<<(x%8));
            }
        }

        /**
         * Draw a vertical line
         * @param x defines the horizontal (x) start position for the line
         * @param y defines the vertical (y) start position for the line
         * @param len defines the length of the vertical line in number of pixels
        */
        //% blockId=grove_oled_draw_vline 
        //% block="zeichne verticale Linie ab x|%x|und y|%y|, Länge|%len|"
        //% weight=69
        //% y.min=0 y.max=127
        //% x.min=0 x.max=127
        //% len.min=1 len.max=128
        export function drawVLine(x: number, y: number, len: number):void {
            let x_min = 0; 
            let x_max = 0;
            x_min = Math.floor((x / 8));
            x_max = x + len;
            x_min = x_min * 8;
            if (x_max > 128) x_max = 128;
            while ((x_max % 8) != 0) {
                x_max++;
            }

            let last_bit = 0xff;
            for (let i=0;i<(x_max-x-len);i++) {
                last_bit = last_bit - (0x01<<(7-i));
            }
            let first_bit = 0xff;
            for (let i=0;i<(x-x_min);i++) {
                first_bit = first_bit - (0x01<<i);
            }
            
            if (x_max - x_min > 16) {
                drawPixel(x_min,y,first_bit);
                for (let i=x_min+8;i<x_max-8;i=i+8){
                    drawPixel(i,y,0xff);
                }
                drawPixel(x_max-1,y,last_bit);
            }
            else if (x_max - x_min == 16) {
                drawPixel(x_min,y,first_bit);
                drawPixel(x_max-1,y,last_bit);
            }
            else {
                drawPixel(x_min,y,(first_bit & last_bit));
            }
        }

        /**
         * Draw a rectangle
         * @param x1 x-coordinate for the upper left corner of the rectangle
         * @param y1 y-coordinate for the upper left corner of the rectangle
         * @param x2 x-coordinate for the lower right corner of the rectangle
         * @param y2 y-coordinate for the lower right corner of the rectangle
        */
        //% blockId=grove_oled_draw_rec 
        //% block="zeichne Rechteck von x|%x1|und y|%y1|, bis x|%x2|und y|%y2|"
        //% weight=60
        //% advanced=true
        //% y1.min=0 y1.max=127
        //% x1.min=0 x1.max=127
        //% y2.min=0 y2.max=127
        //% x2.min=0 x2.max=127
        export function drawRec(x1: number, y1: number, x2:number, y2:number):void {
            let temp = 0;
            if (y2<y1) {
                temp = y2;
                y2 = y1;
                y1 = temp;
            }
            if (x2<x1) {
                temp = x2;
                x2 = x1;
                x1 = temp;
            }

            drawHLine(x1,y1,y2-y1+1);
            drawHLine(x2,y1,y2-y1+1);
            drawVLine(x1,y1,x2-x1+1);
            drawVLine(x1,y2,x2-x1+1);
        }
    
        const basicFont: string[] = [
        "\x00\x00\x00\x00\x00\x00\x00\x00", // " "
        "\x00\x00\x5F\x00\x00\x00\x00\x00", // "!"
        "\x00\x00\x07\x00\x07\x00\x00\x00", // """
        "\x00\x14\x7F\x14\x7F\x14\x00\x00", // "#"
        "\x00\x24\x2A\x7F\x2A\x12\x00\x00", // "$"
        "\x00\x23\x13\x08\x64\x62\x00\x00", // "%"
        "\x00\x36\x49\x55\x22\x50\x00\x00", // "&"
        "\x00\x00\x05\x03\x00\x00\x00\x00", // "'"
        "\x00\x1C\x22\x41\x00\x00\x00\x00", // "("
        "\x00\x41\x22\x1C\x00\x00\x00\x00", // ")"
        "\x00\x08\x2A\x1C\x2A\x08\x00\x00", // "*"
        "\x00\x08\x08\x3E\x08\x08\x00\x00", // "+"
        "\x00\xA0\x60\x00\x00\x00\x00\x00", // ","
        "\x00\x08\x08\x08\x08\x08\x00\x00", // "-"
        "\x00\x60\x60\x00\x00\x00\x00\x00", // "."
        "\x00\x20\x10\x08\x04\x02\x00\x00", // "/"
        "\x00\x3E\x51\x49\x45\x3E\x00\x00", // "0"
        "\x00\x00\x42\x7F\x40\x00\x00\x00", // "1"
        "\x00\x62\x51\x49\x49\x46\x00\x00", // "2"
        "\x00\x22\x41\x49\x49\x36\x00\x00", // "3"
        "\x00\x18\x14\x12\x7F\x10\x00\x00", // "4"
        "\x00\x27\x45\x45\x45\x39\x00\x00", // "5"
        "\x00\x3C\x4A\x49\x49\x30\x00\x00", // "6"
        "\x00\x01\x71\x09\x05\x03\x00\x00", // "7"
        "\x00\x36\x49\x49\x49\x36\x00\x00", // "8"
        "\x00\x06\x49\x49\x29\x1E\x00\x00", // "9"
        "\x00\x00\x36\x36\x00\x00\x00\x00", // ":"
        "\x00\x00\xAC\x6C\x00\x00\x00\x00", // ";"
        "\x00\x08\x14\x22\x41\x00\x00\x00", // "<"
        "\x00\x14\x14\x14\x14\x14\x00\x00", // "="
        "\x00\x41\x22\x14\x08\x00\x00\x00", // ">"
        "\x00\x02\x01\x51\x09\x06\x00\x00", // "?"
        "\x00\x32\x49\x79\x41\x3E\x00\x00", // "@"
        "\x00\x7E\x09\x09\x09\x7E\x00\x00", // "A"
        "\x00\x7F\x49\x49\x49\x36\x00\x00", // "B"
        "\x00\x3E\x41\x41\x41\x22\x00\x00", // "C"
        "\x00\x7F\x41\x41\x22\x1C\x00\x00", // "D"
        "\x00\x7F\x49\x49\x49\x41\x00\x00", // "E"
        "\x00\x7F\x09\x09\x09\x01\x00\x00", // "F"
        "\x00\x3E\x41\x41\x51\x72\x00\x00", // "G"
        "\x00\x7F\x08\x08\x08\x7F\x00\x00", // "H"
        "\x00\x41\x7F\x41\x00\x00\x00\x00", // "I"
        "\x00\x20\x40\x41\x3F\x01\x00\x00", // "J"
        "\x00\x7F\x08\x14\x22\x41\x00\x00", // "K"
        "\x00\x7F\x40\x40\x40\x40\x00\x00", // "L"
        "\x00\x7F\x02\x0C\x02\x7F\x00\x00", // "M"
        "\x00\x7F\x04\x08\x10\x7F\x00\x00", // "N"
        "\x00\x3E\x41\x41\x41\x3E\x00\x00", // "O"
        "\x00\x7F\x09\x09\x09\x06\x00\x00", // "P"
        "\x00\x3E\x41\x51\x21\x5E\x00\x00", // "Q"
        "\x00\x7F\x09\x19\x29\x46\x00\x00", // "R"
        "\x00\x26\x49\x49\x49\x32\x00\x00", // "S"
        "\x00\x01\x01\x7F\x01\x01\x00\x00", // "T"
        "\x00\x3F\x40\x40\x40\x3F\x00\x00", // "U"
        "\x00\x1F\x20\x40\x20\x1F\x00\x00", // "V"
        "\x00\x3F\x40\x38\x40\x3F\x00\x00", // "W"
        "\x00\x63\x14\x08\x14\x63\x00\x00", // "X"
        "\x00\x03\x04\x78\x04\x03\x00\x00", // "Y"
        "\x00\x61\x51\x49\x45\x43\x00\x00", // "Z"
        "\x00\x7F\x41\x41\x00\x00\x00\x00", // """
        "\x00\x02\x04\x08\x10\x20\x00\x00", // "\"
        "\x00\x41\x41\x7F\x00\x00\x00\x00", // """
        "\x00\x04\x02\x01\x02\x04\x00\x00", // "^"
        "\x00\x80\x80\x80\x80\x80\x00\x00", // "_"
        "\x00\x01\x02\x04\x00\x00\x00\x00", // "`"
        "\x00\x20\x54\x54\x54\x78\x00\x00", // "a"
        "\x00\x7F\x48\x44\x44\x38\x00\x00", // "b"
        "\x00\x38\x44\x44\x28\x00\x00\x00", // "c"
        "\x00\x38\x44\x44\x48\x7F\x00\x00", // "d"
        "\x00\x38\x54\x54\x54\x18\x00\x00", // "e"
        "\x00\x08\x7E\x09\x02\x00\x00\x00", // "f"
        "\x00\x18\xA4\xA4\xA4\x7C\x00\x00", // "g"
        "\x00\x7F\x08\x04\x04\x78\x00\x00", // "h"
        "\x00\x00\x7D\x00\x00\x00\x00\x00", // "i"
        "\x00\x80\x84\x7D\x00\x00\x00\x00", // "j"
        "\x00\x7F\x10\x28\x44\x00\x00\x00", // "k"
        "\x00\x41\x7F\x40\x00\x00\x00\x00", // "l"
        "\x00\x7C\x04\x18\x04\x78\x00\x00", // "m"
        "\x00\x7C\x08\x04\x7C\x00\x00\x00", // "n"
        "\x00\x38\x44\x44\x38\x00\x00\x00", // "o"
        "\x00\xFC\x24\x24\x18\x00\x00\x00", // "p"
        "\x00\x18\x24\x24\xFC\x00\x00\x00", // "q"
        "\x00\x00\x7C\x08\x04\x00\x00\x00", // "r"
        "\x00\x48\x54\x54\x24\x00\x00\x00", // "s"
        "\x00\x04\x7F\x44\x00\x00\x00\x00", // "t"
        "\x00\x3C\x40\x40\x7C\x00\x00\x00", // "u"
        "\x00\x1C\x20\x40\x20\x1C\x00\x00", // "v"
        "\x00\x3C\x40\x30\x40\x3C\x00\x00", // "w"
        "\x00\x44\x28\x10\x28\x44\x00\x00", // "x"
        "\x00\x1C\xA0\xA0\x7C\x00\x00\x00", // "y"
        "\x00\x44\x64\x54\x4C\x44\x00\x00", // "z"
        "\x00\x08\x36\x41\x00\x00\x00\x00", // "{"
        "\x00\x00\x7F\x00\x00\x00\x00\x00", // "|"
        "\x00\x41\x36\x08\x00\x00\x00\x00", // "}"
        "\x00\x02\x01\x01\x02\x01\x00\x00"  // "~"
    ] ;
    const extendedCharacters: string[] = [
        "\x00\x7D\x0A\x09\x0A\x7D\x00\x00", // "Ä"
        "\x00\x3D\x42\x41\x42\x3D\x00\x00", // "Ö"
        "\x00\x3D\x40\x40\x40\x3D\x00\x00", // "Ü"
        "\x00\x21\x54\x54\x55\x78\x00\x00", // "ä"
        "\x00\x39\x44\x44\x39\x00\x00\x00", // "ö"
        "\x00\x3D\x40\x40\x7D\x00\x00\x00", // "ü"
        "\x00\xFE\x09\x49\x36\x00\x00\x00", // "ß"
        "\x00\x14\x3E\x55\x55\x55\x14\x00", // "€"
        "\x00\x02\x05\x02\x00\x00\x00\x00"  // "°"
    ];
    

}