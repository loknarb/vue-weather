<template>
  <Main msg="5 Day Weather Forecast in" />
  <div class="lg:items-center lg:justify-center lg:flex">
    <DateCard :date="date" v-for="date in dateDayLong" :key="date" />
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
} from "../src/components/types";
export default defineComponent({
  name: "App",
  components: {
    Main,
    DateCard,
  },
  data: () => ({
    dateDayLong: {} as weatherObject,
  }),
  methods: {
    getDateDayLong() {
      let weatherObject: weatherObject = {}; // this needs to be more specifically typed
      const date = new Date();
      const CURR_DAY_EPOCH = Math.floor(date.getTime() / 1000);
      const day = date.getDay();
      const DAY_DELTA = 86400;

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
      forecast.list.forEach((dayObject) => {
        const forecastDayString = new Date(dayObject.dt * 1000).toLocaleDateString("en-US", {
          weekday: "long",
        });
        if (dayObject.dt - CURR_DAY_EPOCH > 0 && weatherObject[forecastDayString]) {
          // this will be our current day and the next 5 days
          const weatherTemperature: weatherTemperature = {
            temp: dayObject.main.temp,
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
      console.log(weatherObject);
      return weatherObject;
    },
  },
  mounted: function () {
    this.dateDayLong = this.getDateDayLong();
  },
});
</script>
