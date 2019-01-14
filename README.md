# Piano App

## Features

* Works at different breakpoints reasonably well
* Allows dragging for glissando effects
* Records and plays back clips in time
* Accurate appearance
* Sampler, player, and recorder are seperated into seperate files for ease of refactoring
* No redux yet, but everything is orchestrated on the app level.
* Semi-permanent server. No SQL database, but stored in a persisted node variable.

## TODO / Technical Debt

* The rest of the features
* We store songs as JSON Strings on the GraphQL
* A power cut will lose all your songs
