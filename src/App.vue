<template>
  <Main
    msg="5 Day Weather Forecast in"
    v-model="locationDefault"
    :locations="locations"
    @got-changed="optionChanged"
    @temp-toggle="tempToggle"
  />

  <div class="lg:items-center lg:justify-center lg:flex">
    <DateCard :date="date" v-for="date in getResult" :key="date" :tempType="tempType" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Main from "./components/Main.vue";
import DateCard from "./components/DateCard.vue";
import forecast from "../public/forecast.json";
import {
  weatherOptions,
  weatherTemperature,
  weatherDescription,
  weatherObject,
  locationObject,
} from "../src/components/types";
export default defineComponent({
  name: "App",
  components: {
    Main,
    DateCard,
  },
  data: () => ({
    tempType: "F",
    locations: ["Orlando", "Munich", "Lyon"] as string[],
    locationDefault: "Munich",
    locationObject: {} as locationObject,
    dates: {} as weatherObject,
    getResult: {} as weatherObject | string,
  }),
  methods: {
    getDates(data: typeof forecast) {
      let weatherObject: weatherObject = {}; // this needs to be more specifically typed
      const date = new Date();
      const CURR_DAY_EPOCH = Math.floor(date.getTime() / 1000);
      const day = date.getDay();

      const dayLong = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      for (let i = 0; i < 5; i++) {
        if (day + i > 6) {
          weatherObject[`${dayLong[day + i - 7]}`] = [];
        } else {
          weatherObject[`${dayLong[day + i]}`] = [];
        }
      }
      data.list.forEach((dayObject) => {
        const forecastDayString = new Date(dayObject.dt * 1000).toLocaleDateString("en-US", {
          weekday: "long",
        });
        if (dayObject.dt - CURR_DAY_EPOCH > 0 && weatherObject[forecastDayString]) {
          // this will be our current day and the next 5 days
          const weatherTemperature: weatherTemperature = {
            fahrenheitTemp: ((dayObject.main.temp - 273.15) * 1.8 + 32).toFixed(0),
            celsiusTemp: (dayObject.main.temp - 273.15).toFixed(0),
          };
          const weatherDescription: weatherDescription = {
            description: dayObject.weather[0].description,
            icon: dayObject.weather[0].icon,
            id: dayObject.weather[0].id,
          };
          const weatherOptions: weatherOptions = {
            dt: dayObject.dt,
            main: weatherTemperature,
            weather: weatherDescription,
          };
          // we need to pull the day from the date object and compare it to our weatherObject
          weatherObject[forecastDayString].push(weatherOptions);
        }
      });
      return weatherObject;
    },
    async getDataByOption(locationObject: locationObject) {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${locationObject.lat}&lon=${locationObject.lon}&appid=a7c1c466c68ffe3cc7958dd3ec3e5b80`
        );
        if (!res.ok) {
          const message = `An error has occured: ${res.status} - ${res.statusText}`;
          throw new Error(message);
        }
        const data = await res.json();
        this.getResult = this.getDates(data);
      } catch (error) {
        if (error instanceof Error) {
          this.getResult = error.message;
        } else {
          this.getResult = "An error has occured";
        }
      }
    },
    optionChanged(location: string) {
      switch (location) {
        case "Orlando":
          this.locationDefault = "Orlando";
          this.locationObject = {
            lat: 28.538336,
            lon: -81.3773584,
          };
          this.getDataByOption(this.locationObject);

          break;
        case "Munich":
          this.locationDefault = "Munich";
          this.locationObject = {
            lat: 48.1371079,
            lon: 11.5753822,
          };
          this.getDataByOption(this.locationObject);
          break;
        case "Lyon":
          this.locationDefault = "Lyon";
          this.locationObject = {
            lat: 45.764043,
            lon: 4.8356548,
          };

          this.getDataByOption(this.locationObject);
          break;
        default:
          this.locationDefault = "Munich";
          this.locationObject = {
            lat: 48.1371079,
            lon: 11.5753822,
          };
          this.getDataByOption(this.locationObject);
          break;
      }
    },
    tempToggle(temp: string) {
      if (temp === "F") {
        console.log(temp);
        this.tempType = temp;
      } else {
        console.log(temp);
        this.tempType = temp;
      }
    },
    // this will trigger the inputChangeHandler in Main.vue
    // TODO we need to define what event actually is and not use any
    // refetch data
    // this.getDataByOption();
  },
  mounted() {
    this.optionChanged("Munich");
    // this.getDataByOption(this.locationObject);
  },
});
</script>
