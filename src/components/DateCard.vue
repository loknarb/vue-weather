<template>
  <div
    class="z-10 w-56 mx-auto my-4 transition-all shadow-xl bg-primary-focus lg:mx-4 card hover:scale-105"
    @click="selectDate($event)"
  >
    <label for="my-modal" class="cursor-pointer">
      <div class="card-body">
        <div v-if="modalShow">
          <div class="card bg-primary-focus opacity-90">
            <figure><img :src="require(`../assets/${date[0].weather.icon}@2x.png`)" /></figure>
            <h1 class="justify-center text-3xl text-secondary card-title">{{ dayOfWeek }}</h1>
          </div>
        </div>
        <div v-else>
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
              <h3 class="justify-center text-secondary-focus opacity-80 card-title">
                {{ maxTemp }}
              </h3>
            </div>
            <div>
              <span>LO:</span>
              <h3 class="justify-center text-secondary-focus opacity-80 card-title">
                {{ minTemp }}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { weatherOptions } from "./types";
export default defineComponent({
  name: "DateCard",
  emits: ["date-clicked", "modal-clicked"],
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
    tempType: {
      type: String as PropType<"F" | "C">,
      required: true,
    },
    modalShow: {
      type: Boolean as PropType<boolean>,
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
        if (tempType === "F") {
          if (parseInt(day.main.fahrenheitTemp) > max) {
            max = parseInt(day.main.fahrenheitTemp);
          }
        } else {
          if (parseInt(day.main.celsiusTemp) > max) {
            max = parseInt(day.main.celsiusTemp);
          }
        }
      });
      return this.turnInToDegree(max);
    },
    searchMinTemp(tempType: string) {
      let min = 100;
      this.date.forEach((day) => {
        if (tempType === "F") {
          if (parseInt(day.main.fahrenheitTemp) < min) {
            min = parseInt(day.main.fahrenheitTemp);
          }
        } else {
          if (parseInt(day.main.celsiusTemp) < min) {
            min = parseInt(day.main.celsiusTemp);
          }
        }
      });
      return this.turnInToDegree(min);
    },
    searchAvgTemp(tempType: string) {
      let avg = 0;
      this.date.forEach((day) => {
        if (tempType === "F") {
          if (this.date.length >= 7) {
            // this is to separate current day and the rest of the days
            avg += parseInt(day.main.fahrenheitTemp);
          } else {
            // definitely a better solution but this will work for now
            // this will just calculate our current days temperature and add it current temperature recursively to the daily average
            avg += parseInt(this.date[0].main.fahrenheitTemp);
          }
        } else {
          if (this.date.length >= 7) {
            // this is to separate current day and the rest of the days
            avg += parseInt(day.main.celsiusTemp);
          } else {
            // definitely a better solution but this will work for now
            // this will just calculate our current days temperature and add it current temperature recursively to the daily average
            avg += parseInt(this.date[0].main.celsiusTemp);
          }
        }
      });
      return this.turnInToDegree(avg / this.date.length);
    },
    selectDate(event: MouseEvent) {
      this.$emit("date-clicked", this.getDateDay());
      this.$emit("modal-clicked", event);
    },
  },
  watch: {
    tempType: {
      handler(newVal: string) {
        this.minTemp = this.searchMinTemp(newVal);
        this.maxTemp = this.searchMaxTemp(newVal);
        this.avgTemp = this.searchAvgTemp(newVal);
      },
      immediate: true,
    },
  },
  mounted() {
    this.maxTemp = this.searchMaxTemp(this.tempType);
    this.minTemp = this.searchMinTemp(this.tempType);
    this.avgTemp = this.searchAvgTemp(this.tempType);
    this.dayOfWeek = this.getDateDay();
  },
});
</script>
