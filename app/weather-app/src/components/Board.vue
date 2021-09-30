<template>
  <v-container class="mt-2 mb-2 board">
    <div class="bg-img-container">
      <div class="bg-img" :style="bgImgStyle"></div>
    </div>

    <v-btn
      v-for="(pos, i) in positions"
      :key="i"
      @click="position = pos"
      dark
      color="rgba(20, 20, 30, 0.6)"
      class="mb-4 mr-2 on-top"
    >
      {{ pos.name }}
      <v-btn
        v-if="positions.length > 1"
        @click="positions.splice(i, 1)"
        class="mr-n3"
        icon
        ><v-icon small>mdi-close-circle</v-icon></v-btn
      >
    </v-btn>
    <v-btn
      @click="position = geoposition"
      dark
      color="rgba(20, 20, 30, 0.6)"
      class="mb-4 mr-2 on-top"
      :show="geoposition.active"
      >📍</v-btn
    >
    <v-btn
      @click="dialog = true"
      dark
      fab
      small
      color="rgba(20, 20, 30, 0.6)"
      class="mb-4 ml-2 mr-2 on-top"
    >
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>

    <div class="on-top">
      <v-card color="rgba(20, 20, 30, 0.6)" class="header">
        <v-container>
          <v-row>
            <h1>{{ position.name }}</h1>
          </v-row>
          <v-row>
            <h2 class="no-shadow">
              {{ formatDate(weatherNow.time) }}
            </h2>
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
                    >{{ weatherNow.data.instant.details.wind_speed }}m/s</span
                  >
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card>

      <v-col class="pb-0" cols="12" v-for="(card, i) in cards" :key="i">
        <h2
          class="mt-4 mb-1"
          v-if="cards[i - 1] && isNewDay(cards[i - 1].time, card.time)"
        >
          {{ formatDate(card.time) }}
        </h2>
        <Card
          :time="card.time"
          :temp="card.temp"
          :humidity="card.humidity"
          :wind-direction="card['wind-direction']"
          :wind-speed="card['wind-speed']"
          :precipitation="card.precipitation"
          :summary="card.summary"
          :hidden="card.hidden"
          @click="card.hidden = !card.hidden"
        />
      </v-col>
    </div>
    <footer class="mt-4">
      <div>
        Background
        <a :href="this.bgUrl">Photo</a>
        was taken by
        <a :href="bgPhotographerUrl">
          {{ bgPhotographer }}
        </a>
        on Pexels.
      </div>

      <a href="https://www.pexels.com">
        <img
          height="30px"
          src="https://images.pexels.com/lib/api/pexels-white.png"
        />
      </a>
    </footer>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title> New position </v-card-title>
        <v-card-text>
          <v-form v-model="valid">
            <v-text-field v-model="newname" :rules="nameRules" label="Name">
            </v-text-field>
            <v-text-field
              v-model="newlat"
              :rules="numberRules"
              label="Latitude"
            >
            </v-text-field>
            <v-text-field
              v-model="newlon"
              :rules="numberRules"
              label="Longtitude"
            >
            </v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="dialog = false"> Close </v-btn>
          <v-btn
            color="primary"
            :disabled="!valid"
            text
            @click="
              addPosition();
              dialog = false;
            "
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
        .get("https://api.pexels.com/v1/search", {
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
          this.bgImg = photos[index].src.medium;
          this.bgUrl = photos[index].url;
          this.bgPhotographer = photos[index].photographer;
          this.bgPhotographerUrl = photos[index].photographer_url;
        });
    },
    position() {
      this.getWeather();
    },
    positions() {
      localStorage.setItem("weatherLocs", JSON.stringify(this.positions));
    },
  },
  data: () => ({
    dialog: false,
    valid: false,
    newlat: 0.0,
    newlon: 0.0,
    newname: "",
    numberRules: [(v: any) => !isNaN(v) || "Not a valid number"],
    nameRules: [(v: any) => !!v || "Name cannot be empty"],

    position: {
      name: "Null island",
      coords: {
        lat: 0.0,
        lon: 0.0,
      },
    },
    geoposition: {
      active: false,
      name: "Null island",
      coords: {
        lat: 0.0,
        lon: 0.0,
      },
    },
    positions: [
      {
        name: "Bergen",
        coords: {
          lat: 60.4035,
          lon: 5.3247,
        },
      },
      {
        name: "kanagawa",
        coords: {
          lat: 35.4043,
          lon: 139.3515,
        },
      },
    ],
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
    bgUrl: "",
    bgPhotographer: "",
    bgPhotographerUrl: "",
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
      return moment(date).format("LL (dddd)");
    },
    asRotTransform(angle: number) {
      return `rotate(${angle})`;
    },
    isNewDay(previous: string, now: string) {
      return moment(previous).isBefore(now, "day");
    },
    addPosition() {
      this.positions.push({
        name: this.newname,
        coords: {
          lat: Number(this.newlat),
          lon: Number(this.newlon),
        },
      });

      this.newname = "";
      this.newlat = 0.0;
      this.newlon = 0.0;
    },
    getWeather() {
      this.$axios
        .get("https://api.met.no/weatherapi/locationforecast/2.0/compact", {
          params: {
            lat: this.position.coords.lat.toFixed(4),
            lon: this.position.coords.lon.toFixed(4),
          },
        })
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

            let summary = "";
            if (t.data.next_1_hours !== undefined) {
              summary = t.data.next_1_hours.summary.symbol_code;
            } else if (t.data.next_6_hours !== undefined) {
              summary = t.data.next_6_hours.summary.symbol_code;
            } else if (t.data.next_12_hours !== undefined) {
              summary = t.data.next_12_hours.summary.symbol_code;
            }

            let precipitation = 0;
            if (t.data.next_1_hours !== undefined) {
              precipitation = t.data.next_1_hours.details.precipitation_amount;
            } else if (t.data.next_6_hours !== undefined) {
              precipitation = t.data.next_6_hours.details.precipitation_amount;
            } else if (t.data.next_12_hours !== undefined) {
              precipitation = t.data.next_12_hours.details.precipitation_amount;
            }

            tmp.push({
              hidden: false,
              time: t.time,
              temp: t.data.instant.details.air_temperature,
              humidity: t.data.instant.details.relative_humidity,
              "wind-direction": t.data.instant.details.wind_from_direction,
              "wind-speed": t.data.instant.details.wind_speed,
              summary,
              precipitation,
            });
          }
          this.cards = tmp;
        });
    },
  },
  created() {
    const localPositions = localStorage.getItem("weatherLocs");
    if (localPositions) {
      this.positions = JSON.parse(localPositions);
    }
    this.position = this.positions[0];
  },
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.geoposition = {
          active: true,
          name: "📍",
          coords: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
        };
      });
    } else {
      console.log(
        "geolocation no available"
      ); /* geolocation IS NOT available, handle it */
    }
    moment.locale(navigator.language);
    this.getWeather();
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
img {
  display: block;
}
footer {
  position: absolute;
  left: 0;
  width: 100vw;
  height: 60px;
  padding: 10px;
  background-color: #20202a;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 16px;
}
h1 {
  font-weight: 300;
  font-size: 3rem;
  text-transform: uppercase;
}
h2 {
  color: #fff;
  text-shadow: 2px 2px 8px #000000c0;
}
h2.no-shadow {
  text-shadow: none;
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