/**
 * Created by Brandon on 4/10/2017.
 */
var mocha = require('mocha');
var Light = require('../src/Lights');
var assert = require('assert');
var EventEmitter = require('events').EventEmitter;
describe("Test a single light", function(){
    var light = new Light("North")
    it("creates a light with name North and State = Red", function(){
        var light = new Light("North")
       assert.equal(light.lightName, "North");
       assert.equal(light.lightState, Light.LightStates.red);
    });
    it ("Change the light state to yellow", function(){
        var light = new Light("North")
        light.lightState = Light.LightStates.yellow;
        assert.equal(light.lightState, Light.LightStates.yellow);
    });

    it ("<StateMachine> Cycle a light from red", function(done){
        this.timeout(Light.OnTimer + Light.yellowTimer + 100);
        var emitter = new EventEmitter();
        var light = new Light("North", emitter);
        light.lightState = Light.LightStates.red;
        light.cycleLight();
        emitter.on('switchLight', function(eventLight){
            //ensure that the light is still red
            assert.equal(eventLight.lightState, Light.LightStates.red)
            done();
        });
    });

    it ("<StateMachine> Cycle a light from green", function(done){
        this.timeout(Light.yellowTimer + 10);
        var emitter = new EventEmitter();
        var light = new Light("North", emitter);
        light.lightState = Light.LightStates.green;
        light.cycleLight();
        emitter.on('switchLight', function(eventLight){
            //ensure that the light is still red
            assert.equal(eventLight.lightState, Light.LightStates.red)
            done();
        });
    });

    it ("<StateMachine> Cycle a light from yellow", function(done){
        //I was unsure if I wanted to fix this
        this.timeout((Light.OnTimer*2) + Light.yellowTimer + 10);
        var emitter = new EventEmitter();
        var light = new Light("North", emitter);
        light.lightState = Light.LightStates.yellow;
        light.cycleLight();
        emitter.on('switchLight', function(eventLight){
            //ensure that the light is still red
            assert.equal(eventLight.lightState, Light.LightStates.red)
            done();
        });
    });
});

describe("Test 2 lights in communication", function(){
   it ("cycle each light once", function(done){
       this.timeout((Light.OnTimer*2) + (Light.yellowTimer*2) + 100);
       var emitter = new EventEmitter();
       var light1 = new Light("NS", emitter);
       var light2 = new Light("EW", emitter);
       light1.cycleLight();
       emitter.on('switchLight', function(eventLight){
           //ensure that the light is still red
           if (eventLight.lightName === "NS"){
               assert.equal(eventLight.lightState, Light.LightStates.red);
               assert.equal(light2.lightState, Light.LightStates.red);
               light2.cycleLight();
               assert.equal(light2.lightState, Light.LightStates.green)
           }
           else{
               assert.equal(eventLight.lightState, Light.LightStates.red);
               assert.equal(light1.lightState, Light.LightStates.red);
               done();
           }
       });
   })
});




