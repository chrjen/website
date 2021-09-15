<template>
  <v-card hover color="indigo lighten-4" width="200" @click="$emit('click')">
    <div :class="{ hidden: hidden }">
      <div>
        {{ label }}
      </div>
      <div>{{ temp }}°C</div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: ["label", "temp", "hidden"],
  data: () => ({}),
};
</script>

<style scoped>
.hidden {
  opacity: 0;
}
</style>