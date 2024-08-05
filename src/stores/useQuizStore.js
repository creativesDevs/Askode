import { defineStore } from "pinia";
import getQuiz from '../api/apiQuiz.js';

export const useQuizStore = defineStore('quizStore', {
    state: () => ({
        quizData: [],

    }),
    actions: {
        async fetchData(params) {
            try {
                this.quizData = await getQuiz(params);
                console.log(this.quizData);
            }
            catch (error) {
                console.error('Error fetching quiz data:', error);
            }
        }
    }

})