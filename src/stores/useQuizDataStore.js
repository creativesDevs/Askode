import { defineStore } from "pinia";
import axios from 'axios';

const VITE_API_KEY_QUIZ = import.meta.env.VITE_API_KEY_QUIZ;

export const useQuizStore = defineStore('quizStore', {
    state: () => ({
        quizData: [],
        loading: false,
        errorMessage: null
    }),
    actions: {
        async fetchData(params) {
            const defaultOptions = {
                headers: {
                    'X-Api-Key': VITE_API_KEY_QUIZ,
                },
                params: params,
            };
            this.loading = true;
            try {
                const response = await axios.get('https://quizapi.io/api/v1/questions', defaultOptions);
                this.quizData = response.data;
                console.log(this.quizData)
            } catch (error) {
                console.error('Error fetching data:', error);
                this.errorMessage = error.message
                throw error;
            } finally {
                this.loading = false;
            }
        }
    }
})




