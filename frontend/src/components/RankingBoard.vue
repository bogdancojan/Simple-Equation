<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-card>
    <v-card-title>Ranking Board</v-card-title>
    <v-card-text>
      <v-list v-if="rankingBoard.length">
        <v-list-item v-for="(player, index) in rankingBoard" :key="index">
          <v-list-item-content>
            <v-list-item-title>{{ index + 1 }}. {{ player.name }}</v-list-item-title>
            <v-list-item-subtitle>
              Correct Answers: {{ player.correctAnswers }}, Time: {{ player.time }} seconds
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <p v-else>No players yet. Be the first champion!</p>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('rankingBoard', ['rankingBoard'])
  }
};
</script>