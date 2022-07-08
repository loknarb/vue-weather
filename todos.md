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
    - [ ] Make Fahrenheit and Celsius more appealing
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
- [x] Grab API and plug it into our main
- [x] Add dynamic input and search handling to find desired Location

## Work out value in options 
- [x] Connect those options with a brand new API request 
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
- [x] Modal SFC Created
- [x] Proper data from selected card passed correctly into Modal
- [x] We might want to emit our card to APP vue and 
- [x] Click should toggle Modal
- [x] Card should grow transition into Modal view and center itself
- [ ] Apply specific X and Y position on each card that is passed into Modalposition.X, 
- [ ] We can then implement a smooth transistion from icons into cards
- [ ] TODO Modal View done in Mobile first
- [ ] TODO Modal View done in Desktop second
- [ ] TODO Click on Overview shouldn't bubble up in DOM
- [ ] TODO Flex on customModal needs to be evenly distributed amongst 8 overview
- [ ] Onclick out should maybe just display one card and have that return

## Card Resuability Idea
- [ ] Show 5 Cards change their data when click to new detailed data from specific day,
- [ ] if day not currDay then 8 and we need a slider.
- [ ] Card Animation flip over
## Skeleton Card on Fetch Change
