<template>
    <div>
      <h1 class="text-black">Quiz</h1>
      <div v-if="loading" class="loading">Cargando...</div>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      <div v-if="quizData">
        <div v-for="(question, index) in quizData" :key="index">
          <p>{{ question.question }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import  getQuiz  from '../api/apiQuiz.js';
  
  export default {
    name: 'Quiz',
    data() {
      return {
        quizData: null,
        errorMessage: null,
        loading: false,
      };
    },
    methods: {
      async fetchQuiz() {
        this.loading = true;
        this.errorMessage = null;
        try {
          this.quizData = await getQuiz();
        } catch (error) {
          if (error.response) {
            this.errorMessage = `Error: ${error.response.status} - ${error.response.data}`;
          } else if (error.request) {
            
            this.errorMessage = 'Error: No response received from the server';
          } else {
            
            this.errorMessage = `Error: ${error.message}`;
          }
          console.error('Error fetching quiz data:', error);
        } finally {
          this.loading = false;
        }
      },
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
  </style>