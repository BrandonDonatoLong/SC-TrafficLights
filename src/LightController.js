/**
 * Created by Brandon on 4/10/2017.
 */
//create this light controller to control the hardware on the lights.

var wiringPi = require('wiring-pi');
wiringPi.setup('wpi');

//pin 6 is ground

//NS red = 7, NS yellow = 11, NS green = 13
// physical pins are as follows
// 7 | 7; 11 | 0; 13 | 2
//EW red = 15, EW yellow = 16, EW green = 18
// 15 | 3; 16 | 4; 18 | 5

module.exports = LEDSet = function(pinArray){
    this.pinArray = [];
    for(var pinIndex in pinArray){
        wiringPi.pinMode(pinArray[pinIndex], wiringPi.OUTPUT);
        this.pinArray.push(pinArray[pinIndex]);
    }
};

LEDSet.prototype.changeLedSet = function(ledStateArray){
    for (var ledIndex in ledStateArray){
        wiringPi.digitalWrite(this.pinArray[ledIndex],ledStateArray[ledIndex]);
    }
};