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
  emits: ["update:modelValue", "got-changed"],
  data: () => ({}),
  methods: {
    inputChangeHandler(e: any) {
      console.log("input from our CHILD", e.target.value);
      this.$emit("got-changed", e.target.value);
    },
  },
  // watch: {
  //   locationDefault(newVal: string) {
  //     // console.log("input from our CHILD", newVal);
  //     this.$emit("got-changed", newVal);
  //   }
  // },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
