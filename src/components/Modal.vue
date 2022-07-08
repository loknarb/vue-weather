<template>
  <div v-show="modalShow" class="customModalContainer" @click="closeModalHandler">
    <div class="customModal rounded-md border-none" ref="customModal">
      <div class="flex justify-between w-full bg-primary">
        <div
          class="bg-primary-focus opacity-90 mx-2 my-2 rounded"
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
  emits: ["modal-closed"],
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
    closeModalHandler() {
      console.log("closeModal checker", this.modalShow);
      if (this.modalShow) {
        const cm = this.$refs.customModal as HTMLDivElement;
        cm?.classList.toggle("expand");
        cm.style.top = this.modalPosition.Y / 1.25 + "px";
        cm.style.left = this.modalPosition.X / 2 + "px";
        setTimeout(() => {
          this.$emit("modal-closed");
        }, 700);
      }
    },
  },
  watch: {
    modalShow: {
      handler(newValue: boolean) {
        if (newValue) {
          console.log("newValue", newValue);
          const cm = this.$refs.customModal as HTMLDivElement;
          console.log(cm);
          if (cm !== null && cm !== undefined) {
            console.log(cm);
            console.log(this.modalPosition);
            cm.style.top = this.modalPosition.Y / 1.25 + "px";
            cm.style.left = this.modalPosition.X / 2 + "px";
            setTimeout(() => {
              cm?.classList.toggle("expand");
            }, 100);
          }
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
  position: fixed;
  background: white;
  transition: all 0.5s ease-in-out;
  z-index: 9999;
}
.customModal.expand {
  top: 25% !important;
  left: 50% !important;
  transform: translate(-50%, -50%);
}
.customModal.shrunk {
  top: 0;
  left: 0;
  transform: translate(0, 0);
}
</style>
