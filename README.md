# Piano App

## Features

* Works at different breakpoints reasonably well
* Allows dragging for glissando effects
* Records and plays back clips in time
* Accurate appearance
* Sampler, player, and recorder are seperated into seperate files for ease of refactoring
* No redux yet, but everything is orchestrated on the app level.
* Semi-permanent server. No SQL database, but stored in a persisted node variable.
* Title generator with silly dinosaur based concatonation. I really like the feature in Korg Gadget.

## TODO / Technical Debt

* We store songs as JSON Strings on the GraphQL
* A power cut will lose all your songs
* UX fine tuning
* More indication that the stop button stops.
* Fallback mechanism for if server is down.
