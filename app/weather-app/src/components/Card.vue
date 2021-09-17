<template>
  <v-card hover color="indigo lighten-4" width="200" @click="$emit('click')">
    <div :class="{ hidden: hidden }">
      <div>
        {{ timeFormated }}
      </div>
      <div>{{ temp }}°C</div>
    </div>
  </v-card>
</template>

<script>
import moment from 'moment';

export default {
  props: [
      "time", "temp", "hidden"
      ],
  data: () => ({}),
  computed: {
      timeFormated() {
          const m = moment(this.time, true);
          return m.format('DD/MM HH:mm');
      }
  }
};
</script>

<style scoped>
.hidden {
  opacity: 0;
}
</style>