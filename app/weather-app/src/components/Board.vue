<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12"> Hello </v-col>
      <v-col v-for="(card, i) in cards" :key="i" cols="2">
        <Card :label="card.label" :hidden="card.hidden" @click="card.hidden = !card.hidden" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Card from "./Card.vue";

export default Vue.extend({
  name: "Board",
  components: {
    Card,
  },
  data: () => ({
    cards: [
      {
        label: "Today",
        hidden: true,
      },
      {
        label: "Tomorrow",
        hidden: true,
      },
      {
        label: "In 3 days",
        hidden: true,
      },
      {
        label: "Today",
        hidden: true,
      },
      {
        label: "Tomorrow",
        hidden: true,
      },
      {
        label: "In 3 days",
        hidden: true,
      },
      {
        label: "In 4 days",
        hidden: true,
      },
      {
        label: "In 5 days",
        hidden: true,
      },
      {
        label: "In 6 days",
        hidden: true,
      },
      {
        label: "In 4 days",
        hidden: true,
      },
      {
        label: "In 5 days",
        hidden: true,
      },
      {
        label: "In 6 days",
        hidden: true,
      },
      {
        label: "In 7 days",
        hidden: true,
      },
      {
        label: "In 8 days",
        hidden: true,
      },
      {
        label: "In 9 days",
        hidden: true,
      },
      {
        label: "In 7 days",
        hidden: true,
      },
      {
        label: "In 8 days",
        hidden: true,
      },
      {
        label: "In 9 days",
        hidden: true,
      },
    ],
  }),
});
</script>
