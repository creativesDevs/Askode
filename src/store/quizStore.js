import { defineStore } from "pinia";

export const useQuizStore = defineStore("quiz", {
  state: () => ({
    loading: false,
    quizData: null,
    currentQuiz: 0,
    selectAnswers: [],
    isAnswerSelected: false,
  }),
  getters: {
    currentQuestion(state) {
      return state.quizData ? state.quizData[state.currentQuiz] : {};
    },
    finalQuestion(state) {
      return state.quizData
        ? state.currentQuiz === state.quizData.lenght - 1
        : false;
    },
    progressBarWidth(state) {
      const totalQuestions = state.quizData.lenght;
      const progressPercentage =
        totalQuestions > 0
          ? (state.countCorrectAnswers / totalQuestions) * 100
          : 0;
      return `${progressPercentage}%`;
    },
  },
  actions: {
    async fetchQuiz(params) {
      try {
        this.quizData = await getQuiz(params);
      } catch (error) {
        console.error("Error Fetching quizData: ", error);
      }
    },
  },
});
