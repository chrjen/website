<template>
  <v-card
    class="card"
    hover
    color="rgba(20, 20, 30, 0.6)"
    @click="$emit('click')"
  >
    <v-container class="pa-1">
      <div :class="{ hidden: hidden }">
        <v-row>
          <v-col class="mr-n2" align-self="center" cols="auto">
            {{ timeFormated }}
          </v-col>
          <v-col align-self="center" cols="auto">
            <img
              width="30px"
              class="ma-n2 weather-icon"
              :src="weatherIconPath(summary)"
            />
          </v-col>
          <v-col align-self="center" cols="auto"> {{ temp }}°C </v-col>
          <v-col
            v-if="precipitation !== 0"
            class="ml-n2 mr-n2 precipitation"
            align-self="center"
            cols="auto"
          >
            {{ precipitation }} mm
          </v-col>
          <v-col align-self="center" cols="auto">
            <svg class="ma-n1" width="25px" height="25px" viewBox="-50 -50 100 100">
              <path
                :transform="asRotTransform(windDirection + 180)"
                fill="#ffffff"
                d="M -10 40 L 10 40 L 10 -5 L 30 -5 L 0 -40 L -30 -5 L -10 -5 "
              />
            </svg>
          </v-col>
          <v-col class="ml-n4" align-self="center" cols="auto"> {{ windSpeed }} m/s </v-col>
        </v-row>
      </div>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";

export default Vue.extend({
  props: [
    "time",
    "temp",
    "humidity",
    "windDirection",
    "windSpeed",
    "hidden",
    "precipitation",
    "summary",
  ],
  data: () => ({}),
  computed: {
    timeFormated() {
      return moment(this.time).format("LT");
    },
  },
  methods: {
    weatherIconPath(weather: string) {
      return `/weathericon/svg/${weather}.svg`;
    },
    asRotTransform(angle: number) {
      return `rotate(${angle})`;
    },
  },
});
</script>

<style scoped>
.card {
  font-size: 1.15rem;
  font-weight: 300;
  padding: 10px;
}
.card * {
  color: #fff;
}
.hidden {
  opacity: 0;
}
.precipitation {
  color: rgb(81, 182, 223);
}
</style>