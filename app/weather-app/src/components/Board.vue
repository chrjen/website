<template>
  <v-container class="board">
    <div class="bg-img-container">
      <div class="bg-img" :style="bgImgStyle"></div>
    </div>

    <v-row class="on-top text-center">
      <v-col cols="12">
        <h2>Weather now</h2>
      </v-col>
      <v-col cols="12">
        Humidity {{ weatherNow.data.instant.details.relative_humidity }}%
        <br />
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
  watch: {
    weatherNow(weather) {
      this.$axios
        .get("https://api.pexels.com/v1/search?query=rain", {
          headers: {
            Authorization:
              "563492ad6f91700001000001059dc5a1a65440e6acce55adc02420b4",
          },
          params: {
            query: weather.data.next_1_hours.summary.symbol_code,
            size: "small",
          },
        })
        .then((resp) => {
          const photos = resp.data.photos;
          const index = Math.floor(Math.random() * photos.length);
          this.bgImg = photos[index].src.original;
        });
    },
  },
  data: () => ({
    weatherNow: {
      time: "2021-09-15T20:00:00Z",
      data: {
        instant: {
          details: {
            air_pressure_at_sea_level: 0.0,
            air_temperature: 0,
            cloud_area_fraction: 0.0,
            relative_humidity: 0.0,
            wind_from_direction: 0.0,
            wind_speed: 0.0,
          },
        },
        next_12_hours: {
          summary: {
            symbol_code: "",
          },
        },
        next_1_hours: {
          summary: {
            symbol_code: "",
          },
          details: {
            precipitation_amount: 0.0,
          },
        },
        next_6_hours: {
          summary: {
            symbol_code: "",
          },
          details: {
            precipitation_amount: 0.0,
          },
        },
      },
    },
    cards: [],
    bgImg: "",
  }),
  computed: {
    bgImgStyle() {
      return {
        "background-image": 'url("' + this.bgImg + '")',
      };
    },
  },
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
.on-top {
  position: relative;
  z-index: 5;
}
.bg-img-container {
  box-sizing: border-box;
  position: absolute;
  overflow: hidden;

  background-color: black;

  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;

  transform: scale(1.03);
}
.bg-img {
  width: 100%;
  height: 100%;

  filter: blur(4px);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>