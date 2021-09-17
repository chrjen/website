<template>
  <v-container class="board">
    <v-row class="text-center">
      <v-col cols="12">
        <h2>Weather now</h2>
      </v-col>
      <v-col cols="12">
        Humidity {{ weatherNow.data.instant.details.relative_humidity }}%
        <br>
        Temp {{ weatherNow.data.instant.details.air_temperature }}°C
      </v-col>

      <v-col cols="12">
        <h2>Weather predictions</h2>
      </v-col>
      <v-col v-for="(card, i) in cards" :key="i" cols="4">
        <Card
          :time="card.time"
          :temp="card.temp"
          :hidden="card.hidden"
          @click="card.hidden = !card.hidden"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Card from "./Card.vue";
import moment from "moment";

export default Vue.extend({
  name: "Board",
  components: {
    Card,
  },
  data: () => ({
    weatherNow: {},
    cards: [],
  }),
  mounted() {
    this.$axios
      .get(
        "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=60&lon=11"
      )
      .then((resp) => {
        if (resp.status !== 200) {
          console.error(resp.statusText);
          return;
        }

        const data = resp.data.properties;

        let tmp = [];
        for (let i = 0; i < 18; i++) {
          const t = data.timeseries[i];
          const now = moment();
          if (now.isSameOrAfter(t.time, "hour")) {
            if (now.isSame(t.time, "hour")) {
              console.log("Now", t);
              this.weatherNow = t;
            }
            continue;
          }
          tmp.push({
            hidden: false,
            time: t.time,
            temp: t.data.instant.details.air_temperature,
          });
        }
        this.cards = tmp;
      });
  },
});
</script>

<style scoped>
h1 {
  color: #fff;
}
.board {
  background-color: #3f51b5;
}
</style>