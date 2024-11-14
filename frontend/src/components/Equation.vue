<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
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
  </div>
</template>

<script>
export default {
  props: {
    equation: String
  },
  data() {
    return {
      answer: ''
    };
  },
  computed: {
    formattedEquation() {
      return this.equation.replace('?', '____');
    }
  },
  methods: {
    submitAnswer() {
      const correctAnswer = eval(this.equation.split('=')[0].trim());
      const userAnswer = parseFloat(this.answer);
      const tolerance = 0.01;
      const isCorrect = Math.abs(userAnswer - correctAnswer) < tolerance;

      this.$emit('answer-submitted', { correct: isCorrect });

      this.answer = '';
      this.$nextTick(() => {
        this.$refs.answerInput.focus();
      });
    }
  }
};
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

.feedback {
  margin-top: 10px;
}
</style>