/**
 * Created by Brandon on 4/10/2017.
 */

module.exports = Light = function(_lightName, ee){
    this.lightName = _lightName;
    this.lightState = "red";
    this.ee = ee;
}

Light.OnTimer = 300*1000;
Light.yellowTimer = 30*1000;

Light.LightStates = {red:"red", yellow:"yellow", green:"green"};

Light.States = {
    red:{
        changeTo: Light.LightStates.green, timeout:Light.OnTimer},
    yellow:{
        changeTo:Light.LightStates.red,timeout:Light.OnTimer} ,
    green:{
        changeTo:Light.LightStates.yellow,timeout:Light.yellowTimer}
};


Light.prototype.cycleLight = function(){
    var stateChangeObject = Light.States[this.lightState];
    this.lightState = stateChangeObject.changeTo;
    var _this = this;
    console.log(this.lightName, 'is now', this.lightState);
    setTimeout(function(){
        // at this point we need to change the light. If we change to red then we need to not change again and tell the
        // master function or emit and event to start to change the next light.

        if (_this.lightState == Light.LightStates.yellow) {
            _this.lightState = Light.LightStates.red;
            console.log(_this.lightName, 'is now', _this.lightState)
            _this.ee.emit('switchLight', _this);
        }
        else {
            _this.cycleLight();
        }
    },stateChangeObject.timeout);
}
