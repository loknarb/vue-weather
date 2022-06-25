<template>
  <div>
    <h1 class="my-4 font-mono text-3xl text-primary-focus">{{ msg }}</h1>
    <select
      v-model="locationDefault"
      class="text-5xl text-center bg-transparent border-b-4 rounded-sm appearance-none text-primary-content border-b-primary-content"
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
  },
  data: () => ({
    locations: ["Orlando", "Munich", "Lyon"] as string[],
    locationDefault: "Munich",
  }),
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
