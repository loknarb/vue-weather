<template>
  <div v-show="modalShow" class="customModalContainer">
    <div class="customModal" ref="customModal">
      <div class="flex justify-between w-full">
        <div
          class="bg-primary-focus opacity-90"
          v-for="date in dateObjectDetail"
          :value="date"
          :key="date"
        >
          <p class="mx-2">{{ convert(date.dt) }} HR</p>
          <figure><img :src="require(`../assets/${date.weather.icon}@2x.png`)" /></figure>
          <p class="mx-2">{{ tempTypeHandler(date.main) }}</p>
          <p class="mx-2">{{ date.weather.description }}</p>
        </div>
      </div>
      <!-- <p class="text-2xl text-black">{{ dateObjectDetail }}</p> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { weatherOptions } from "./types";
export default defineComponent({
  name: "Modal",
  components: {},
  data: () => ({
    selectedTemperatureType: "",
  }),
  props: {
    dateObjectDetail: {
      type: Object as PropType<weatherOptions>,
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
    modalPosition: {
      type: Object as PropType<{
        X: number;
        Y: number;
      }>,
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
    convert(epochTime: number) {
      const dt = new Date(epochTime * 1000);
      const hr = dt.getUTCHours();
      const m = "0" + dt.getUTCMinutes();

      return hr + ":" + m.substring(-2);
    },
    tempTypeHandler(main: weatherOptions["main"]) {
      if (this.tempType === "F") {
        return main.fahrenheitTemp;
      } else {
        return main.celsiusTemp;
      }
    },
  },
  watch: {
    modalShow: {
      handler(newValue: boolean) {
        console.log("targetted");
        // console.log(customModal.value);
        const cm = this.$refs.customModal as HTMLDivElement;
        console.log(cm);
        if (cm !== null && cm !== undefined) {
          console.log(cm);
          cm.style.top = this.modalPosition.Y + "px";
          cm.style.left = this.modalPosition.X + "px";
          setTimeout(() => {
            cm?.classList.toggle("expand");
          }, 100);
        }
      },
      immediate: true,
    },
  },
});
</script>
<style>
.customModalContainer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
.customModal {
  position: absolute;
  width: 0%;
  height: 0%;
  width: 50%;
  height: 25%;
  background: white;
  transition: all 0.5s ease-in-out;
  z-index: 9999;
}
.customModal.expand {
  top: 25% !important;
  left: 50% !important;
  transform: translate(-50%, -50%);
}
</style>
