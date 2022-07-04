<template>
  <div>
    <h1 class="my-4 font-mono text-3xl text-primary-focus">{{ msg }}</h1>
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
    <div class="my-4">
      <button
        class="mx-4 bg-primary-content text-primary-focus text-2xl px-2 hover:bg-opacity-80 transition-all rounded-md"
        @click="changeWeatherF"
      >
        F</button
      ><button
        class="mx-4 bg-primary-content text-primary-focus text-2xl px-2 hover:bg-opacity-80 transition-all rounded-md"
        @click="changeWeatherC"
      >
        C
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Main",
  props: {
    msg: String,
    locations: Array,
    modelValue: String,
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
