<template>
  <Main msg="Welcome to Your Vue.js + TypeScript App" />
  <DateCard :date="date" v-for="date in dateDayLong" :key="date" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Main from "./components/Main.vue";
import DateCard from "./components/DateCard.vue";
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
          // TODO we want this to be upcoming days not past days
          x[i] = dayLong[day + i - 7];
        } else {
          x[i] = dayLong[day + i];
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
