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
import { weatherObject, weatherOptions } from "./types";
export default defineComponent({
  name: "DateCard",
  data: () => ({
    minTemp: "",
    maxTemp: "",
    dayOfWeek: "",
  }),
  props: {
    date: {
      type: Array as PropType<weatherOptions[]>,
      required: true,
    },
  },
  methods: {
    turnInToDegree(temp: string) {
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
  },
  mounted() {
    this.maxTemp = this.searchMaxTemp();
    this.minTemp = this.searchMinTemp();
    this.dayOfWeek = this.getDateDay();
  },
});
</script>
