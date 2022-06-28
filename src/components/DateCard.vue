<template>
  <div class="w-56 mx-auto my-4 shadow-xl bg-primary-focus lg:mx-4 card">
    <div class="card-body">
      <div class="card bg-primary">
        <figure><img :src="`../assets/${date[0].weather.icon}.png`" /></figure>
      </div>
      <h1 class="justify-center text-secondary card-title">{{ date[0].main.temp }}</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { weatherObject } from "./types";
export default defineComponent({
  name: "DateCard",
  props: {
    date: {
      type: Object as PropType<weatherObject>,
      required: true,
    },
  },
});
</script>
