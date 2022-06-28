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
import { weatherOptions } from "../src/components/types";
export default defineComponent({
  name: "App",
  components: {
    Main,
    DateCard,
  },
  data: () => ({
    dateDayLong: {} as weatherOptions,
  }),
  methods: {
    getDateDayLong() {
      let x: weatherOptions = {}; // this needs to be more specifically typed
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
          x[`${dayLong[day + i - 7]}`] = [];
        } else {
          x[`${dayLong[day + i]}`] = [];
        }
      }
      forecast.list.forEach((dayObject) => {
        // console.log(dayObject.main.temp);

        if (CURR_DAY_EPOCH < dayObject.dt && Number.isInteger(dayObject.dt / DAY_DELTA)) {
          // this will be new date
          // x[i][dayLong[day + i - 7]].push(dayObject);
          // const forecastDateDay = new Date(dayObject.dt * 1000);
          const forecastDayString = new Date(dayObject.dt * 1000).toLocaleDateString("en-US", {
            weekday: "long",
          });
          console.log("x", x);
          console.log("STRING ", forecastDayString);
          // console.log(x[forecastDayString]);
          // new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(forecastDateDay)
          // x[forecastDateDay].push(dayObject);
          // console.log("new day", x[i]);
          // console.log("day", day);
          // console.log("index", i);
          // console.log("daylongDay", dayLong[day + i - 7]);

          // x[k][dayLong[day + i - 7]] = {
          //   temp: dayObject.main.temp,
          //   icon: dayObject.weather[0].icon,
          //   description: dayObject.weather[0].description,
          // };

          // todo add our json file looping through list and pushing about 8 for days past
        } else if (CURR_DAY_EPOCH < dayObject.dt) {
          // this will be iterations in 3h intervals of curr day
          const forecastDateDay = new Date(dayObject.dt * 1000).getDay();
          // x[forecastDateDay].push(dayObject);
          // x[i][dayLong[day + i]].push(dayObject);
          // x[k][dayLong[day + i]] = {
          //   temp: dayObject.main.temp,
          //   icon: dayObject.weather[0].icon,
          //   description: dayObject.weather[0].description,
          // };
        } else {
          // nothing interesting just past dates this shouldn't happen when we start pulling api data
          return;
        }
      });

      console.log(x);
      return x;
    },
  },
  mounted: function () {
    this.dateDayLong = this.getDateDayLong();
  },
});
</script>
