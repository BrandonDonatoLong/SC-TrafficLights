# SC-TrafficLights
Quick program to control traffic signals at a 4 way intersection.


To setup:

1.) Clone the repo
2.) Run npm install to get Mocha

To run the base program type
> node main.js

I used mocha to run the unit tests. It was able to run in webstorm so that is how I tested it.
Note the unit tests use the timer values defined in Lights.js so if you want to run them you may want to drop the values
down to 5 and 3 seconds.

Example output: Green is on for 5 minute and yellow is on for 30 seconds. This output constitutes about 30 minutes of
running

Initial State: EastWest is red

Initial State: NorthSouth is red

NorthSouth is now green

NorthSouth is now yellow

NorthSouth is now red

EastWest is now green

EastWest is now yellow

EastWest is now red

NorthSouth is now green

NorthSouth is now yellow

NorthSouth is now red

EastWest is now green

EastWest is now yellow

EastWest is now red

NorthSouth is now green

NorthSouth is now yellow

NorthSouth is now red

EastWest is now green

EastWest is now yellow

EastWest is now red
