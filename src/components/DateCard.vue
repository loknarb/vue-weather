<template>
  <div class="w-56 mx-auto my-4 shadow-xl bg-primary-focus lg:mx-4 card">
    <div class="card-body">
      <div class="card bg-primary">
        <figure><img src="../assets/04d@2x.png" /></figure>
      </div>
      <h1 class="justify-center text-secondary card-title">{{ date }}</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DateCard",
  props: {
    date: String,
  },
});
</script>
