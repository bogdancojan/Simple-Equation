<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-5" outlined>
          <v-card-text>
            <div v-if="!started">
              <h3>In Speed Run mode, you will have 1:30 minutes to solve 30 equations. Hit start when you're ready!</h3>
              <v-btn color="primary" @click="startGame">Start</v-btn>
            </div>
            <div v-else>
              <v-row style="padding-bottom: 13px;">
                <v-col><p>Time left: {{ timeLeft }} seconds.</p></v-col>
                <v-col><p>Equations answered: {{ equationsAnswered }}/30.</p></v-col>
              </v-row>
              <Equation :equation="equation" @answer-submitted="handleAnswer" />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <RankingBoard />
    </v-row>

    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Time is up!</v-card-title>
        <v-card-text>
          You lose. Better luck next time!
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeDialog">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="finishDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Congratulations!</v-card-title>
        <v-card-text>
          <p>You have finished the Speed Run!</p>
          <v-text-field v-model="playerName" label="Enter your name" />
          <v-btn color="primary" @click="submitScore">Submit</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Equation from '../components/Equation.vue';
import RankingBoard from '../components/RankingBoard.vue';

export default {
  components: {
    Equation,
    RankingBoard
  },
  data() {
    return {
      started: false,
      timeLeft: 90,
      equationsAnswered: 0,
      correctAnswers: 0,
      dialog: false,
      finishDialog: false,
      playerName: ''
    };
  },
  computed: {
    ...mapState('equations', ['equation']),
  },
  methods: {
    ...mapActions('equations', ['fetchEquation']),
    ...mapActions('rankingBoard', ['addPlayer']),
    startGame() {
      this.resetGame();
      this.started = true;
      this.fetchEquation();
      this.startTimer();
    },
    handleAnswer({ correct }) {
      if (correct) {
        this.correctAnswers++;
      }

      this.equationsAnswered++;

      if (this.equationsAnswered < 30) {
        this.fetchEquation();
      } else {
        clearInterval(this.timer);
        this.finishDialog = true;
      }
    },
    startTimer() {
      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          clearInterval(this.timer);
          this.dialog = true;
        }
      }, 1000);
    },
    closeDialog() {
      this.dialog = false;
      this.started = false;
    },
    submitScore() {
      this.addPlayer({
        name: this.playerName,
        correctAnswers: this.correctAnswers,
        time: 90 - this.timeLeft
      });
      this.finishDialog = false;
      this.started = false;
    },
    resetGame() {
      this.timeLeft = 90;
      this.equationsAnswered = 0;
      this.correctAnswers = 0;
      this.playerName = '';
    }
  },
  beforeUnmount() {
    clearInterval(this.timer);
  }
};
</script>