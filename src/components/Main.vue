<template>
  <div class="flex flex-col justify-center items-center">
    <h1 class="my-4 font-mono text-3xl text-primary-focus">{{ msg }}</h1>
    <div class="flex">
      <select
        class="text-5xl text-center bg-transparent border-b-4 rounded-sm appearance-none text-primary-content border-b-primary-content"
        @input="inputChangeHandler"
        :value="modelValue"
      >
        <div class="divider"></div>
        <option v-for="location in locations" :value="location" :key="location">
          {{ location }}
        </option>
      </select>
      <div class="flex flex-col ml-2">
        <button
          class="btn btn-square btn-sm text-primary-focus text-xl hover:bg-opacity-80 transition-all rounded-md border-none h-6 min-h-2 active:bg-primary-focus focus:bg-primary-focus focus:text-primary-content"
          :class="{ 'text-primary-content bg-primary-focus': tempType === 'F' }"
          @click="changeWeatherF"
        >
          F°</button
        ><button
          class="btn btn-square btn-sm text-primary-focus text-xl hover:bg-opacity-80 transition-all rounded-md border-none h-6 min-h-2 active:bg-primary-focus"
          :class="{ 'text-primary-content bg-primary-focus': tempType === 'C' }"
          @click="changeWeatherC"
        >
          C°
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Main",
  props: {
    msg: String,
    locations: Array,
    modelValue: String,
    tempType: {
      type: String as PropType<"F" | "C">,
      required: true,
    },
  },
  emits: ["got-changed", "temp-toggle"],
  data: () => ({}),
  methods: {
    changeWeatherF() {
      this.$emit("temp-toggle", "F");
    },
    changeWeatherC() {
      this.$emit("temp-toggle", "C");
    },
    inputChangeHandler(e: any) {
      this.$emit("got-changed", e.target.value);
    },
  },
});
</script>
