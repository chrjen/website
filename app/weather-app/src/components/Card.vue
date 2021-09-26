<template>
  <v-card
    class="card"
    hover
    color="rgba(20, 20, 30, 0.6)"
    @click="$emit('click')"
  >
    <v-container>
      <div :class="{ hidden: hidden }">
        <v-row>
          <v-col cols="auto">
            {{ timeFormated }}
          </v-col>
          <v-col cols="auto">
            <img
              width="30px"
              class="weather-icon"
              :src="weatherIconPath(summary)"
            />
          </v-col>
          <v-col> {{ temp }}°C </v-col>
        </v-row>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import moment from "moment";

export default {
  props: [
    "time",
    "temp",
    "humidity",
    "wind-direction",
    "wind-speed",
    "hidden",
    "summary",
  ],
  data: () => ({}),
  computed: {
    timeFormated() {
      return moment(this.time).format("LT");
    },
  },
  methods: {
    weatherIconPath(weather) {
      return `/weathericon/svg/${weather}.svg`;
    },
  },
};
</script>

<style scoped>
.card {
  padding: 10px;
}
.card * {
  color: #fff;
}
.hidden {
  opacity: 0;
}
</style>