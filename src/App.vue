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
export default defineComponent({
  name: "App",
  components: {
    Main,
    DateCard,
  },
  data: () => ({
    dateDayLong: [] as any[],
  }),
  methods: {
    getDateDayLong() {
      let x = [] as any[]; // this needs to be more specifically typed
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
      let k = 0;
      for (let i = 0; i < 5; i++) {
        if (day + i > 6) {
          x.push({ [dayLong[day + i - 7]]: {} });
        } else {
          x.push({ [dayLong[day + i]]: {} });
        }
        // this is not ideal we are recursively calling this function 5 times
        forecast.list.forEach((dayObject) => {
          // console.log(dayObject.main.temp);
          if (CURR_DAY_EPOCH < dayObject.dt && Number.isInteger(dayObject.dt / DAY_DELTA)) {
            // this will be new date
            console.log(k);
            if (k > 5) {
              return;
            } else {
              k++;
              console.log("new day", x[k]);
            }

            // x[k][dayLong[day + i - 7]] = {
            //   temp: dayObject.main.temp,
            //   icon: dayObject.weather[0].icon,
            //   description: dayObject.weather[0].description,
            // };

            // todo add our json file looping through list and pushing about 8 for days past
          } else if (CURR_DAY_EPOCH < dayObject.dt) {
            // this will be iterations in 3h intervals of curr day
            if (k > 5) {
              return;
            } else {
              console.log("curr day", x[k]);
            }
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
      }
      console.log(x);
      return x;
    },
  },
  mounted: function () {
    this.dateDayLong = this.getDateDayLong();
  },
});
</script>
