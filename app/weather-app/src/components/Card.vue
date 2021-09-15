<template>
  <v-card @click="$emit('click')">
    <div :class="{ hidden: hidden }">
      {{ label }}
    </div>
  </v-card>
</template>

<script>
export default {
  props: [
      "label",
      "hidden"
],
  data: () => ({
  }),
};
</script>

<style scoped>
.hidden {
    opacity: 0;
}
</style>