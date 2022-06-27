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
    dateDayLong: [] as string[],
  }),
  methods: {
    getDateDayLong() {
      let x = [] as string[];
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
      let i = 0;
      forecast.list.forEach((dayObject) => {
        // console.log(dayObject.main.temp);
        if (CURR_DAY_EPOCH < dayObject.dt && Number.isInteger(dayObject.dt / DAY_DELTA)) {
          console.log(dayObject.dt - CURR_DAY_EPOCH); // this will be new date
          // console.log(new Date(dayObject.dt * 1000));
        } else if (CURR_DAY_EPOCH < dayObject.dt) {
          // this will be iterations in 3h intervals of curr day
          console.log(new Date(dayObject.dt * 1000));
          console.log("not integer");
        } else {
          // nothing interesting just past dates this shouldn't happen when we start pulling api data
          return;
        }
      });
      for (let i = 0; i < 5; i++) {
        // 5 days forecast
        if (day + i > 6) {
          // this is should reset to 0 when it hits above 6 implying it is sunday
          // ex Monday
          // todo add our json file looping through list and pushing about 8 for days past

          x[i] = dayLong[day + i - 7];
          console.log(x[i]);
        } else {
          // this should return the day if it is less than 6
          x[i] = dayLong[day + i];
          console.log(x[i]);
        }
      }
      return x;
    },
  },
  mounted: function () {
    this.dateDayLong = this.getDateDayLong();
  },
});
</script>
