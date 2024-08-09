<template>
<Navbar />
<main class="flex flex-col md:gap-14 items-center justify-center md:w-full h-full mt-40 ">
    <div class="absolute inset-0 bg-combined-gradient"></div>
    <div class="absolute top-[-50%] left-[25%] bg-gradient-radial-2 w-[50vw] h-[50vw] rounded-full blur-[350px]">
    </div>
    <div v-if="loading || errorMessage" class="flex justify-center items-center mt-64">
        <Loader :isLoading="loading" />
        <h2 class="text-3xl">{{ errorMessage }}</h2>
    </div>
    <Modal v-if="isModalVisible" @resetQuiz="reset" />

    <section v-if="quizData && !loading" class="w-full px-5 lg:w-[80vw] min-h-[300px] bg-black/70  z-10 rounded-lg flex flex-col justify-center relative ">

        <ProgressBar :widthBar="progressBarWidth" :count="countCorrectAnswers" :quizDataLength="quizData.length" />
        <Questions v-show="currentQuestion" :CurrentQuestion="currentQuestion" :multipleAnswers="multipleCorrectAnswers" />
        <button v-if="finalQuestion && isAnswerSelected" @click="openModal" class="absolute bottom-5 right-24 border-2 text-white border-custom-purple  px-5 py-3 rounded-lg hover:border-custom-purple hover:text-custom-purple duration-300 ">
            Finish the game
        </button>
        <span v-else class="absolute bottom-5 right-2 xl:right-24 xl:text-xl">Question {{ currentQuiz + 1 }}</span>
    </section>
    <section v-if="quizData && currentQuestion" class="z-10 w-full px-5 md:px-0 md:w-[80%] lg:w-[70vw]">
        <Answers :answersSelected="isAnswerSelected" :filteredAnswers="filteredAnswers(currentQuestion.answers)" :idAnswers="id_Answers" :condition="(selectedAnswers.length <= correctAnswers && currentQuiz >= lastAnswered && !isAnswerSelected)" @ButtonClass="buttonClass" @SelectAnswers="selectAnswer" @nextQuestion="nextQuestion" />
    </section>
    <div class="flex flex-row-reverse md:block">
        <button class="z-10 md:fixed right-0 xl:right-32 bottom-0 md:top-[20%] block  opacity-80 hover:opacity-100 duration-300  " v-if="isAnswerSelected && !finalQuestion && quizData" @click="nextQuestion" :disabled="currentQuiz >= quizData.length - 1">
            <svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(180)">
                <path d="M56.25 12.5H50V18.75H43.75V25H37.5V31.25H31.25V43.75H37.5V50H43.75V56.25H50V62.5H56.25V12.5ZM18.75 12.5H25V62.5H18.75V12.5Z" fill="url(#paint0_linear_1)" />
                <defs>
                    <linearGradient id="paint0_linear_1" x1="37.5" y1="2.5" x2="37.5" y2="42.5" gradientUnits="userSpaceOnUse">
                        <stop stop-color="white" />
                        <stop offset="1" stop-color="#CC00FF" />
                    </linearGradient>
                </defs>
            </svg>
        </button>

        <button class="text-6xl z-10 left-0 xl:left-32 bottom-0 md:top-[20%] block  md:fixed opacity-80 hover:opacity-100 duration-300 " v-if="(currentQuiz > 0)" @click="previousQuestion">
            <svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(360)">
                <path d="M56.25 12.5H50V18.75H43.75V25H37.5V31.25H31.25V43.75H37.5V50H43.75V56.25H50V62.5H56.25V12.5ZM18.75 12.5H25V62.5H18.75V12.5Z" fill="url(#paint0_linear_2)" />
                <defs>
                    <linearGradient id="paint0_linear_2" x1="37.5" y1="12.5" x2="57.5" y2="92.5" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#CC00FF" />
                        <stop offset="1" stop-color="white" />
                    </linearGradient>
                </defs>
            </svg>
        </button>

    </div>
</main>
</template>

<script>
import Modal from '../components/viewQuizComponents/Modal.vue';
import Loader from '../components/viewQuizComponents/Loader.vue';
import Questions from '../components/viewQuizComponents/Questions.vue';
import ProgressBar from '../components/viewQuizComponents/ProgressBar.vue';
import Answers from '../components/viewQuizComponents/Answers.vue';
import correctSound from '../assets/sounds/correct.mp3';
import incorrectSound from '../assets/sounds/incorrect.mp3';
import {
    mapState,
    mapActions
} from 'pinia'
import {
    useQuizDataStore
} from '../stores/useQuizDataStore.js';
import Navbar from '../components/Navbar.vue';

export default {
    name: 'Quiz',
    components: {
        Modal,
        Loader,
        Questions,
        ProgressBar,
        Answers,
        Navbar
    },
    data() {
        return {
            id_Answers: ["a", "b", "c", "d", "e", "f"],
            countCorrectAnswers: 0,
            currentQuiz: 0,
            selectedAnswers: [],
            correctAnswers: [],
            isAnswerSelected: false,
            isLastAnswerSelected: false,
            isModalVisible: false,
            lastAnswered: -1
        };
    },
    computed: {
        ...mapState(useQuizDataStore, ['quizData', 'loading', 'errorMessage', 'category']),
        currentQuestion() {
            return (this.quizData && this.quizData.length > 0) && this.quizData ? this.quizData[this.currentQuiz] : null;
        },
        finalQuestion() {
            return this.quizData ? this.currentQuiz === this.quizData.length - 1 : false;
        },
        multipleCorrectAnswers() {
            if (this.quizData && this.quizData[this.currentQuiz]) {
                return this.quizData[this.currentQuiz].multiple_correct_answers === 'true';
            }
            return false;
        },
        progressBarWidth() {
            const totalQuestions = this.quizData.length;
            const progressPercentage = totalQuestions > 0 ? (this.countCorrectAnswers / totalQuestions) * 100 : 0;
            return `${progressPercentage}%`;
        }
    },
    methods: {
        ...mapActions(useQuizDataStore, ['fetchData']),

        filteredAnswers(answers) {
            return Object.values(answers).filter(answer => answer);
        },
        playCorrectSound() {
            const audio = new Audio(correctSound);
            audio.volume = 0.4;
            audio.play();
        },

        playIncorrectSound() {
            const audio = new Audio(incorrectSound);
            audio.volume = 0.5;
            audio.play();
        },

        selectAnswer(index) {
            if (this.isAnswerSelected) return;
            const multipleCorrect = this.currentQuestion.multiple_correct_answers === 'true';
            const selectedAnswer = `answer_${this.id_Answers[ index ]}`;

            this.correctAnswers = this.getCorrectAnswers();

            if (multipleCorrect) {

                this.updateMultipleSelections(index);
            } else {

                this.updateSingleSelection(index);
            }
            if (this.correctAnswers.includes(selectedAnswer)) {
                this.playCorrectSound();
            } else {
                this.playIncorrectSound();
            }

            this.checkSelectionIsNotCorrect(selectedAnswer);
            this.checkAllCorrectAnswersSelected();
        },

        updateMultipleSelections(index) {
            this.selectedAnswers.push(index);
            this.lastAnswered = Math.max(this.lastAnswered, this.currentQuiz)

        },

        updateSingleSelection(index) {
            this.selectedAnswers = [index];
            this.lastAnswered = Math.max(this.lastAnswered, this.currentQuiz)
            this.isAnswerSelected = true;
        },

        checkSelectionIsNotCorrect(selectedAnswer) {
            if (!this.correctAnswers.includes(selectedAnswer)) {
                this.isAnswerSelected = true;
            }
        },

        checkAllCorrectAnswersSelected() {
            const uniqueSelectedAnswers = Array.from(new Set(this.selectedAnswers));

            const allSelectedCorrect = uniqueSelectedAnswers.every(eIndex =>
                this.correctAnswers.includes(`answer_${this.id_Answers[ eIndex ]}`)
            );

            const allCorrectSelected = this.correctAnswers.length === uniqueSelectedAnswers.length;

            if (allSelectedCorrect && allCorrectSelected) {
                this.isAnswerSelected = true;
                this.countCorrectAnswers++;
            }
        },
        getCorrectAnswers() {
            return Object.keys(this.currentQuestion.correct_answers)
                .filter(key => this.currentQuestion.correct_answers[key] === 'true')
                .map(key => key.replace('_correct', ''));
        },
        buttonClass(index) {
            if (this.selectedAnswers.includes(index)) {
                const answerId = `answer_${this.id_Answers[ index ]}`;
                return this.correctAnswers.includes(answerId) ? 'correct' : 'incorrect';
            }
            return '';
        },
        nextQuestion() {

            if (this.currentQuiz < this.quizData.length - 1) {
                this.currentQuiz++;

                if (this.currentQuiz >= this.lastAnswered) {
                    this.selectedAnswers = [];
                    this.correctAnswers = [];
                    if (this.lastAnswered !== this.currentQuiz) this.isAnswerSelected = false;
                };
            }
        },

        previousQuestion() {

            if (this.currentQuiz > 0) {
                this.currentQuiz--;
                this.selectedAnswers = [];
                this.isAnswerSelected = true;
            }
        },
        reset() {
            this.currentQuiz = 0;
            this.selectedAnswers = [];
            this.correctAnswers = [];
            this.countCorrectAnswers = 0;
            this.lastAnswered = -1;
            this.isAnswerSelected = false;
            this.errorMessage = null;
            this.loading = false;
            this.isModalVisible = false;
        },
        openModal() {
            this.isModalVisible = true;
        },

    },
    created() {
        const storedCategory = localStorage.getItem('selectedCategory');
        if (!this.quizData || this.quizData.length === 0) {
            if (storedCategory) {
                this.fetchData({
                    category: storedCategory
                });
            } else {
                this.errorMessage = 'No se ha podido cargar los datos del cuestionario.';
            }
        }
    }
};
</script>

<style></style>
