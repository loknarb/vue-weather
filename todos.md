# Connect to our API
 
https://openweathermap.org/

Display a 5-day weather forecast. 
For this app, you can leverage fake, hard-coded data until you get all the features correct.

api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
## Basic Functions implemented:
  - [ ] City Name 
  - [x] Current Weather Icons
  - [x] Temperature
    - [ ] Convert from F to C
    - [x] Current Temp
    - [x] High Temp
    - [x] Low Temp
  - [ ] Humidity
  - [ ] Wind Speed
## Complex Functions implemented:
 - [x] Assets (images) added based on state of weatherConditions
   - [x] Sunny
   - [x] Snowy
   - [x] Rainy
   - [x] Cloudy
   - [x] Windy
## Design
  - [ ] Responsive Mobile First Design
## When we have implemented Nuxt
  - [ ] Apply SSR that frequently API pulls - every 5-10 Minutes

## Further Practice 
  1. Detail View of day of the Week
  2. Add vue-router 
  3. Fetch 5 Day forecast
  4. Add Unit Testing to each component

## Fetch API 
- [x] Set up prevention of refetching if same option clicked
- [ ] Set it up so we are recomparing shallow data to check if we should even refetch.
- Grab API and plug it into our main

## Work out value in options 
- [ ] Connect those options with a brand new API request 
- [ ] Even better connect that API request and store our previous cached request.
- [x] Grab Latitude and Longitude for our location
  - [x] MUNICH 
    - [x] LAT = 48.137154
    - [x] LON = 11.576124
    "lat":48.1371079,"lon":11.5753822
  - [x] ORLANDO 
    - [x] LAT = 28.538336
    - [x] LON = -81.379234
  - [x] LYON 
    - [x] LAT = 45.763420
    - [x] LON = 4.834277

## Card Overview Mode (Modal View)
- [ ] Modal SFC Created
- [ ] Proper data from selected card passed correctly into Modal
- [ ] We might want to emit our card to APP vue and 
- [ ] Click should toggle Modal
- [ ] Card should grow transition into Modal view and center itself
- [ ] Modal View done in Mobile first
- [ ] Modal View done in Desktop second
- [ ] 