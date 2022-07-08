<template>
  <div v-show="backgroundShow" class="customModalContainer" @click="closeModalHandler"></div>
  <div v-show="modalShow" class="customModal rounded-md border-none" ref="customModal">
    <div class="flex bg-primary w-full justify-center">
      <div v-if="loading" class="bg-primary-focus opacity-90 mx-2 my-2 rounded w-full">
        <figure>
          <img :src="require(`../assets/${dateObjectDetail[0].weather.icon}@2x.png`)" />
        </figure>
      </div>
      <div
        v-else
        class="bg-primary-focus opacity-90 mx-2 my-2 rounded w-1/6"
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
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { weatherOptions } from "./types";
export default defineComponent({
  name: "Modal",
  components: {},
  emits: ["modal-closed", "background-closed"],
  data: () => ({
    selectedTemperatureType: "",
    loading: false,
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
    backgroundShow: {
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
      if (this.modalShow) {
        this.loading = true;
        const cm = this.$refs.customModal as HTMLDivElement;
        cm?.classList.toggle("expand");
        cm.style.top = this.modalPosition.Y + "px";
        cm.style.left = this.modalPosition.X + "px";
        cm.style.marginLeft = -cm.offsetWidth / 14 + "px";
        cm.style.marginTop = -cm.offsetHeight / 4 + "px";
        setTimeout(() => {
          this.$emit("modal-closed");
        }, 500);
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    },
  },
  watch: {
    modalShow: {
      handler(newValue: boolean) {
        if (newValue) {
          const cm = this.$refs.customModal as HTMLDivElement;
          if (cm !== null && cm !== undefined) {
            cm.style.top = this.modalPosition.Y + "px";
            cm.style.left = this.modalPosition.X + "px";
            setTimeout(() => {
              cm.style.marginLeft = -cm.offsetWidth / 2 + "px";
              cm.style.marginTop = -cm.offsetHeight / 2 + "px";
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
  transition: all 0.5s ease-in-out;
  z-index: 9999;
}
.customModal.expand {
  top: 25% !important;
  left: 50% !important;
  margin-left: 0 !important;
  margin-top: 0 !important;
  transform: translate(-50%, -50%);
}
</style>
