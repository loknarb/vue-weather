<template>
  <h1>{{ date }}</h1>
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
