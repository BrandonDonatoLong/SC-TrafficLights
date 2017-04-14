/**
 * Created by Brandon on 4/10/2017.
 */

var LEDSet = require('./LightController');

module.exports = Light = function(_lightName, ee, pinArray){
    this.lightName = _lightName;
    this.lightState = "red";
    this.ee = ee;

    this.leds = new LEDSet(pinArray);
}

Light.OnTimer = 5*1000;
Light.yellowTimer = 3*1000;

Light.LightStates = {red:"red", yellow:"yellow", green:"green"};

Light.States = {
    red: {
        changeTo: Light.LightStates.green,
        timeout: Light.OnTimer,
        ledState: [1, 0, 0]
    },
    yellow:{
        changeTo:Light.LightStates.red,
        timeout:Light.OnTimer,
        ledState: [0,1,0]
    },
    green:{
        changeTo:Light.LightStates.yellow,
        timeout:Light.yellowTimer,
        ledState:[0,0,1]
    }
};


Light.prototype.cycleLight = function(){
    var stateChangeObject = Light.States[this.lightState];
    this.lightState = stateChangeObject.changeTo;
    this.leds.changeLedSet(Light.States[this.lightState].ledState);
    var _this = this;
    console.log(this.lightName, 'is now', this.lightState);
    setTimeout(function(){
        // at this point we need to change the light. If we change to red then we need to not change again and tell the
        // master function or emit and event to start to change the next light.

        if (_this.lightState == Light.LightStates.yellow) {
            _this.lightState = Light.LightStates.red;
            _this.leds.changeLedSet(Light.States[Light.LightStates.red].ledState);
            console.log(_this.lightName, 'is now', _this.lightState)
            _this.ee.emit('switchLight', _this);
        }
        else {
            _this.cycleLight();
        }
    },stateChangeObject.timeout);
}
