<template>
  <div class="w-56 mx-auto my-4 shadow-xl bg-primary-focus lg:mx-4 card">
    <div class="card-body">
      <div class="card bg-primary-focus opacity-90">
        <figure><img :src="require(`../assets/${date[0].weather.icon}@2x.png`)" /></figure>
      </div>
      <h1 class="justify-center text-5xl text-secondary card-title">
        {{ avgTemp }}
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
    modelValue: {
      type: String as PropType<string>,
      required: true,
    },
    tempType: {
      type: String as PropType<string>,
      required: true,
    },
  },
  methods: {
    turnInToDegree(temp: string | number) {
      if (typeof temp === "number") {
        return temp.toFixed(0).toString() + "°";
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
    searchMaxTemp(tempType: string) {
      let max = 0;
      this.date.forEach((day) => {
        if (parseInt(day.main.fahrenheitTemp) > max) {
          max = parseInt(day.main.fahrenheitTemp);
        }
      });
      return this.turnInToDegree(max);
    },
    searchMinTemp(tempType: string) {
      let min = 100;
      this.date.forEach((day) => {
        if (parseInt(day.main.fahrenheitTemp) < min) {
          min = parseInt(day.main.fahrenheitTemp);
        }
      });
      return this.turnInToDegree(min);
    },
    searchAvgTemp(tempType: string) {
      let avg = 0;
      this.date.forEach((day) => {
        if (this.date.length >= 7) {
          // this is to separate current day and the rest of the days
          avg += parseInt(day.main.fahrenheitTemp);
        } else {
          // definitely a better solution but this will work for now
          // this will just calculate our current days temperature and add it current temperature recursively to the daily average
          avg += parseInt(this.date[0].main.fahrenheitTemp);
        }
      });
      return this.turnInToDegree(avg / this.date.length);
    },
  },

  mounted() {
    this.maxTemp = this.searchMaxTemp("FAHRENHEIT");
    this.minTemp = this.searchMinTemp("FAHRENHEIT");
    this.avgTemp = this.searchAvgTemp("FAHRENHEIT");
    this.dayOfWeek = this.getDateDay();
  },
});
</script>
