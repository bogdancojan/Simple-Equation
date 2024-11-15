<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-5" outlined>
          <v-card-text>
            <p class="equation">{{ formattedEquation }}</p>
            <div class="answer-container">
              <v-text-field
                ref="answerInput"
                v-model="answer"
                label="Your Answer"
                outlined
                class="answer-input"
              ></v-text-field>
              <v-btn color="primary" @click="submitAnswer">Submit</v-btn>
            </div>
            <div class="history-container">
              <v-row justify="space-between" align="center">
                <v-col>
                   <h3>History</h3>
                </v-col>
                <v-col class="text-right">
                  <span class="correct">{{ correctAnswers }}</span>/
                  <span class="wrong">{{ wrongAnswers }}</span>
                </v-col>
              </v-row>
              <v-list>
                <v-list-item v-for="(item, index) in history.slice().reverse()" :key="index">
                  <v-list-item-content>
                    <v-list-item-title :class="{'correct-answer': item.correct, 'wrong-answer': !item.correct}">
                      {{ item.equation }} = {{ item.answer }} - {{ item.correct ? 'Correct' : 'Wrong' }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      answer: '',
      history: [],
      correctAnswers: 0,
      wrongAnswers: 0
    }
  },
  computed: {
    ...mapState('equations', ['equation']),
    formattedEquation() {
      return this.equation.replace('?', '____')
    }
  },
  methods: {
    ...mapActions('equations', ['fetchEquation']),
    submitAnswer() {
      const correctAnswer = eval(this.equation.split('=')[0].trim())
      const userAnswer = parseFloat(this.answer)
      const tolerance = 0.01
      const isCorrect = Math.abs(userAnswer - correctAnswer) < tolerance

      this.history.push({
        equation: this.equation,
        answer: this.answer,
        correct: isCorrect
      })

      if (isCorrect) {
        this.correctAnswers++
      } else {
        this.wrongAnswers++
      }

      this.answer = ''
      this.fetchEquation()

      // Focus the input field
      this.$nextTick(() => {
        this.$refs.answerInput.focus()
      })
    }
  },
  created() {
    this.fetchEquation();
  }
}
</script>

<style scoped>
.equation {
  font-size: 1.5em;
  margin-bottom: 20px;
}

.answer-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.answer-input {
  margin-right: 10px;
}

.history-container {
  margin-top: 20px;
}

.correct-answer {
  color: green;
}

.wrong-answer {
  color: red;
}

.correct {
  color: green;
}

.wrong {
  color: red;
}
</style>