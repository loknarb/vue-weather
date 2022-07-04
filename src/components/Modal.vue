<template>
  <div>
    <input type="checkbox" id="my-modal" class="modal-toggle" />
    <label for="my-modal" class="modal cursor-pointer">
      <label class="modal-box max-w-5xl relative" for="">
        <div class="flex">
          <div
            class="bg-primary-focus opacity-90"
            v-for="date in dateObjectDetail"
            :value="date"
            :key="date"
          >
            <p class="mx-2">{{ date.dt }}</p>
            <!-- <figure><img :src="require(`../assets/${date.weather.icon}.@2x.png`)" /></figure> -->
          </div>
        </div>
        <!-- <p class="text-2xl text-black">{{ dateObjectDetail }}</p> -->
      </label>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { weatherOptions } from "./types";
export default defineComponent({
  name: "Modal",
  components: {},
  data: () => ({}),
  props: {
    dateObjectDetail: {
      type: Array as PropType<weatherOptions[]>,
      required: true,
    },
    tempType: {
      type: String as PropType<"F" | "C">,
      required: true,
    },
  },
  methods: {},
  watch: {
    dateObjectDetail(newVal: weatherOptions[]) {
      console.log(newVal);
    },
  },
});
</script>
