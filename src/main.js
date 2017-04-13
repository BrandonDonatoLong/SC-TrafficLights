/**
 * Created by Brandon on 4/10/2017.
 */

var Lights = require('./Lights');
var EventEmitter = require('events');
var ee = new EventEmitter();

//Both lights start in red state
var NorthSouth = new Lights("NorthSouth", ee, [7,0,2]);
var EastWest = new Lights("EastWest", ee, [7,0,2]);
console.log("Initial State: "+ EastWest.lightName, "is", EastWest.lightState)
console.log("Initial State: "+ NorthSouth.lightName, "is", NorthSouth.lightState)

ee.on('switchLight', function(light) {
    if (light.lightName == "NorthSouth"){
        //north south is done start EastWest
        EastWest.cycleLight();
    }
    else{
        // East West is done, Start North South
        NorthSouth.cycleLight();
    }
});

NorthSouth.cycleLight();