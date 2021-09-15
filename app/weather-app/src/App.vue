<template>
  <v-app>
    <v-main>
      <Board/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Board from './components/Board.vue';

export default Vue.extend({
  name: 'App',

  components: {
    Board,
  },

  data: () => ({
    //
  }),
});
</script>
