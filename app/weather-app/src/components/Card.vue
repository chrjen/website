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
            class="precipitation"
            align-self="center"
            cols="auto"
          >
            {{ precipitation }} mm
          </v-col>
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
    weatherIconPath(weather) {
      return `/weathericon/svg/${weather}.svg`;
    },
  },
};
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