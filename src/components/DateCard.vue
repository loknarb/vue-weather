<template>
  <div class="w-56 mx-auto my-4 shadow-xl bg-primary-focus lg:mx-4 card">
    <div class="card-body">
      <div class="card bg-primary-focus opacity-90">
        <figure><img :src="require(`../assets/${date[0].weather.icon}@2x.png`)" /></figure>
      </div>
      <h1 class="justify-center text-5xl text-secondary card-title">
        {{ turnInToDegree(date[0].main.temp) }}
      </h1>
      <h1 class="justify-center text-3xl text-secondary card-title">{{ dayOfWeek }}</h1>
      <div class="flex justify-between">
        <div>
          <span>HI:</span>
          <h3 class="justify-center text-secondary-focus opacity-80 card-title">{{ maxTemp }}</h3>
        </div>
        <div>
          <span>LO:</span>
          <h3 class="justify-center text-secondary-focus opacity-80 card-title">{{ minTemp }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { weatherOptions } from "./types";
export default defineComponent({
  name: "DateCard",
  data: () => ({
    minTemp: "",
    maxTemp: "",
    avgTemp: "",
    dayOfWeek: "",
  }),
  props: {
    date: {
      type: Array as PropType<weatherOptions[]>,
      required: true,
    },
  },
  methods: {
    turnInToDegree(temp: string | number) {
      if (temp === typeof "number") {
        return temp.toString() + "°";
      }
      return temp + "°";
    },
    getDateDay() {
      const date = new Date(this.date[0].dt * 1000);
      const dayLong = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      return dayLong[date.getDay()];
    },
    searchMaxTemp() {
      let max = 0;
      this.date.forEach((day) => {
        if (parseInt(day.main.temp) > max) {
          max = parseInt(day.main.temp);
        }
      });
      return this.turnInToDegree(max.toString());
    },
    searchMinTemp() {
      let min = 100;
      this.date.forEach((day) => {
        if (parseInt(day.main.temp) < min) {
          min = parseInt(day.main.temp);
        }
      });
      return this.turnInToDegree(min.toString());
    },
    searchAvgTemp() {
      let avg = 0;
      // let index = 0;
      this.date.forEach((day) => {
        // console.log(
        //   `${index} greater than 3 and less than 6`,
        //   index > this.date.length - 6 && index < this.date.length - 2
        // );
        if (this.date.length >= 7) {
          avg += parseInt(day.main.temp);
        } else {
          // definitely a better solution but this will work for now
          // this will just calculate our current days temperature and add it current temperature recursively to the daily average
          avg += parseInt(this.date[0].main.temp);
        }
      });
      console.log(this.turnInToDegree((avg / this.date.length).toString()));
      return this.turnInToDegree((avg / this.date.length).toString());
    },
  },
  mounted() {
    this.maxTemp = this.searchMaxTemp();
    this.minTemp = this.searchMinTemp();
    this.avgTemp = this.searchAvgTemp();
    this.dayOfWeek = this.getDateDay();
  },
});
</script>
