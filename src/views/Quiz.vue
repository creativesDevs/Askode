<template>
  <section class="">
    <h1 class="text-black">Quiz</h1>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <div v-if="quizData">
      <div>Correct answers: {{ countCorrectAnswers }} of {{ this.quizData.length }}</div>
      <span>{{ currentQuestion.question }}</span>
      <ul>
        <span>Answers:</span>
        <li v-for="(answer, index) in filteredAnswers(currentQuestion.answers)" :key="index">
          <button 
            :class="buttonClass(index)"
            @click="selectAnswer(index)"
            :disabled="isAnswerSelected"
          >
            {{ id_Answers[index] }} - {{ answer }}
          </button>
        </li>
      </ul>
      <button v-if="isAnswerSelected" @click="nextQuestion" :disabled="currentQuiz >= quizData.length - 1">Next</button>
    </div>
  </section>
</template>

<script>
import getQuiz from '../api/apiQuiz.js';

export default {
  name: 'Quiz',
  data() {
    return {
      id_Answers: ["a", "b", "c", "d", "e", "f"],
      countCorrectAnswers: 0,
      quizData: null,
      currentQuiz: 0,
      errorMessage: null,
      loading: false,
      limit: 10,
      category: 'Code',
      selectedAnswers: [],
      correctAnswers: [],
      isAnswerSelected: false,
    };
  },
  computed: {
    currentQuestion() {
      return this.quizData ? this.quizData[this.currentQuiz] : {};
    }
  },
  methods: {
    
    //Obtenemos los datos del Quiz
    async fetchQuiz() {
      this.loading = true;
      this.errorMessage = null;
      try {
        const params = { limit: this.limit, category: this.category };
        this.quizData = await getQuiz(params);
        console.log("quizData", this.quizData);
      } catch (error) {
        this.errorMessage = error.response 
          ? `Error: ${error.response.status} - ${error.response.data}`
          : 'Error: No response received from the server';
        console.error('Error fetching quiz data:', error);
      } finally {
        this.loading = false;
      }
    },

    // Filtramos las preguntas para obtener solo las que no son null.
    filteredAnswers(answers) {
      return Object.values(answers).filter(answer => answer);
    },

    // Método de Selección 
    selectAnswer(index) {
  if (this.isAnswerSelected) return; // Previene la selección si ya se selecciono una respuesta.

  //Comprobamos si hay multiples respuestas correctas.
  const multipleCorrect = this.currentQuestion.multiple_correct_answers === 'true';

  //Capturamos la respuesta selecciona mediante evento @Click y el indice.
  const selectedAnswer = `answer_${this.id_Answers[index]}`;

  //Capturamos mediante le método getCorrectAnswers() las respuestas correctas
  this.correctAnswers = this.getCorrectAnswers();

  if (multipleCorrect) {
    // Si hay multiples respuestas llamamos a updateMultipleSelections() que almacena en un array las multiples selecciones
    this.updateMultipleSelections(index);
  } else { 
    // Si no hay multiples respuestas llamamos a updateSingleSelection()
    this.updateSingleSelection(index);
  }

  this.checkSelectionIsCorrect(selectedAnswer);
  this.checkAllCorrectAnswersSelected();
},

updateMultipleSelections(index) {
  // Almacenamos los indices que capturamos con los @click de los botones en un array
  this.selectedAnswers.push(index);
},

updateSingleSelection(index) {
  this.selectedAnswers = [index];
  this.isAnswerSelected = true; // Bloquea la selección adicional si se selecciona la respuesta correcta
},

checkSelectionIsCorrect(selectedAnswer) {
  if (!this.correctAnswers.includes(selectedAnswer)) {
    this.isAnswerSelected = true; // Bloquea la selección adicional si se selecciona una respuesta incorrecta
  }
},

checkAllCorrectAnswersSelected() {
  //Almacenamos y comprobamos si todos los indices almacenados al seleccionar la respuesta en this.selectedAnswers se encuentran en this.correctAnswers. 
  const allSelectedCorrect = this.selectedAnswers.every(eIndex => this.correctAnswers.includes(`answer_${this.id_Answers[eIndex]}`));
  //Aquí comprobamos  el array de respuestas seleccionadas y el array de respuestas correctas miden lo mismo. Si esto así, todas las respuestas posibles fueron seleccionas.
  const allCorrectSelected = this.correctAnswers.length === this.selectedAnswers.length;
  
  //Si todas las respuestas seleccionadas son correctas y todas has sido seleccionadas entonces bloqueamos poder más selecciones  
  if (allSelectedCorrect && allCorrectSelected) {
    this.isAnswerSelected = true; // Bloquea la selección adicional si se seleccionan todas las respuestas correctas.
    this.countCorrectAnswers++ 
  }
},
    getCorrectAnswers() {
      return Object.keys(this.currentQuestion.correct_answers)
        .filter(key => this.currentQuestion.correct_answers[key] === 'true')
        .map(key => key.replace('_correct', ''));
    },
    buttonClass(index) {
      if (this.selectedAnswers.includes(index)) {
        const answerId = `answer_${this.id_Answers[index]}`;
        return this.correctAnswers.includes(answerId) ? 'correct' : 'incorrect';
      }
      return '';
    },
    nextQuestion() {
      if (this.currentQuiz < this.quizData.length - 1) {
        this.currentQuiz++;
        this.selectedAnswers = [];
        this.correctAnswers = [];
        this.isAnswerSelected = false;
      }
    }
  },
  mounted() {
    this.fetchQuiz();
  },
};
</script>

<style>
.loading {
  color: blue;
}

.error {
  color: red;
}

.selected {
  background-color: yellow;
}

.correct {
  background-color: green;
  color: white;
}

.incorrect {
  background-color: red;
  color: white;
}
</style>
