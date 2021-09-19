<template>
  <v-container class="board">
    <div class="bg-img-container">
      <div class="bg-img" :style="bgImgStyle"></div>
    </div>

    <div class="on-top">
      <v-card color="rgba(20, 20, 30, 0.6)" class="header">
        <v-container>
          <v-row>
            <h2>{{ formatDate(weatherNow.time) }}</h2>
          </v-row>
          <v-row>
            <v-col cols="auto">
              <img
                class="weather-icon"
                :src="
                  weatherIconPath(
                    weatherNow.data.next_1_hours.summary.symbol_code
                  )
                "
              />
            </v-col>
            <v-col cols="auto">
              <v-row>
                <v-col>
                  <span class="stat temp"
                    >{{
                      weatherNow.data.instant.details.air_temperature
                    }}°C</span
                  >
                </v-col>
                <v-col>
                  <span class="stat humidity"
                    >(💧{{
                      weatherNow.data.instant.details.relative_humidity
                    }}%)</span
                  >
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="auto">
                  <svg width="60px" height="60px" viewBox="-50 -50 100 100">
                    <path
                      :transform="
                        asRotTransform(
                          weatherNow.data.instant.details.wind_from_direction +
                            180
                        )
                      "
                      fill="#ffffff"
                      d="M -10 40 L 10 40 L 10 -5 L 30 -5 L 0 -40 L -30 -5 L -10 -5 "
                    />
                  </svg>
                </v-col>
                <v-col>
                  <span class="stat wind-direction"
                    >{{
                      weatherNow.data.instant.details.wind_from_direction
                    }}°</span
                  >
                </v-col>
                <v-col>
                  <span class="stat wind-speed"
                    >{{
                      weatherNow.data.instant.details.wind_speed
                    }}m/s</span
                  >
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card>

      <v-col v-for="(card, i) in cards" :key="i" cols="12">
        <Card
          :time="card.time"
          :temp="card.temp"
          :humidity="card.humidity"
          :wind-direction="card['wind-direction']"
          :wind-speed="card['wind-speed']"
          :summary="card.summary"
          :hidden="card.hidden"
          @click="card.hidden = !card.hidden"
        />
      </v-col>
    </div>
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
  methods: {
    weatherIconPath(weather: string) {
      return `/weathericon/svg/${weather}.svg`;
    },
    formatDate(date: string) {
      return moment(date).format("LL");
    },
    asRotTransform(angle: number) {
      return `rotate(${angle})`;
    },
  },
  mounted() {
    moment.locale(navigator.language);
    this.$axios
      .get(
        "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=60.4035&lon=5.3247"
      )
      .then((resp) => {
        if (resp.status !== 200) {
          console.error(resp.statusText);
          return;
        }

        const data = resp.data.properties;

        let tmp = [];
        for (let i = 0; i < data.timeseries.length; i++) {
          const t = data.timeseries[i];
          const now = moment();
          if (now.isSameOrAfter(t.time, "hour")) {
            if (now.isSame(t.time, "hour")) {
              console.log("Now", t);
              this.weatherNow = t;
            }
            continue;
          }
          
          let summary = ""
          if (t.data.next_1_hours !== undefined) {
            summary = t.data.next_1_hours.summary.symbol_code;
          } else if (t.data.next_6_hours !== undefined) {
            summary = t.data.next_6_hours.summary.symbol_code
          } else if (t.data.next_12_hours !== undefined) {
            summary = t.data.next_12_hours.summary.symbol_code
          }

          tmp.push({
            hidden: false,
            time: t.time,
            temp: t.data.instant.details.air_temperature,
            humidity: t.data.instant.details.relative_humidity,
            'wind-direction': t.data.instant.details.wind_from_direction,
            'wind-speed': t.data.instant.details.wind_speed,
            summary: summary,
          });
        }
        this.cards = tmp;
      });
  },
});
</script>

<style scoped>
.board {
  max-width: 900px;
}
.header {
  color: #fff;
  padding: 20px;
}
.header img {
  width: 150px;
}
.stat.humidity {
  font-size: 3rem;
}
.stat.temp {
  font-size: 5rem;
}
.stat.wind-direction {
  font-size: 3rem;
}
.stat.wind-speed {
  font-size: 3rem;
}
.on-top {
  position: relative;
  z-index: 5;
}
.bg-img-container {
  box-sizing: border-box;
  position: fixed;
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

  filter: blur(8px);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>