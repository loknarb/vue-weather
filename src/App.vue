<template>
  <Main
    msg="5 Day Weather Forecast in"
    v-model="locationDefault"
    :locations="locations"
    @got-changed="optionChanged"
    @temp-toggle="tempToggle"
  />
  <div class="lg:items-center lg:justify-center lg:flex">
    <DateCard
      :date="date"
      v-for="date in dates"
      :key="date"
      :tempType="tempType"
      @date-clicked="dateCardClick"
      @modal-clicked="modalClick"
    />
  </div>
  <Modal
    :dateObjectDetail="dateObjectDetail"
    :tempType="tempType"
    :modalShow="modalShow"
    :modalPosition="modalPosition"
    @modal-closed="modalClose"
  />
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import Main from "./components/Main.vue";
import DateCard from "./components/DateCard.vue";
import Modal from "./components/Modal.vue";
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
    Modal,
  },
  data: () => ({
    tempType: "F",
    locations: ["Orlando", "Munich", "Lyon"] as string[],
    locationDefault: "",
    locationObject: {} as locationObject,
    dates: {} as weatherObject,
    getResult: {} as weatherObject | string,
    dateObjectDetail: {} as weatherOptions[],
    modalPosition: reactive({
      X: 0,
      Y: 0,
    }),
    modalShow: ref(false),
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
      // this forloop dictates how many days we want
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
        this.dates = this.getDates(data);
        console.log(this.dates["Friday"]);
      } catch (error) {
        if (error instanceof Error) {
          this.getResult = error.message;
        } else {
          this.getResult = "An error has occured";
        }
      }
    },
    optionChanged(location?: string) {
      // if the location is the same as the default, we don't need to do anything
      if (location === this.locationDefault) {
        return;
      }
      switch (location) {
        // switches our locations based on current available locations
        // TODO make this dynamically capable of firing one api request for desired location, then grab that data and fire another api request for the next 5 days at desired location.
        case "Orlando":
          this.locationDefault = "Orlando";
          this.locationObject = {
            lat: 28.538336,
            lon: -81.3773584,
          };

          break;
        case "Munich":
          this.locationDefault = "Munich";
          this.locationObject = {
            lat: 48.1371079,
            lon: 11.5753822,
          };
          break;
        case "Lyon":
          this.locationDefault = "Lyon";
          this.locationObject = {
            lat: 45.764043,
            lon: 4.8356548,
          };

          break;
        default:
          this.locationDefault = "Munich";
          this.locationObject = {
            lat: 48.1371079,
            lon: 11.5753822,
          };
          break;
      }
      this.getDataByOption(this.locationObject);
    },
    tempToggle(temp: string) {
      if (this.tempType === temp) {
        return;
      }
      if (temp === "F") {
        this.tempType = temp;
      } else {
        this.tempType = temp;
      }
    },
    dateCardClick(date: string) {
      this.dateObjectDetail = this.dates[date];
    },
    modalClick(e: MouseEvent) {
      this.modalPosition.X = e.clientX;
      this.modalPosition.Y = e.clientY;
      this.modalShow = true;
      // this.show = false;
    },
    modalClose() {
      // TODO we need to make this animate backwards to our previously opened card.
      this.modalShow = false;
    },
    // this will trigger the inputChangeHandler in Main.vue
    // TODO we need to define what event actually is and not use any
    // refetch data
    // this.getDataByOption();
  },
  mounted() {
    this.optionChanged();
    // this.getDataByOption(this.locationObject);
  },
});
</script>
