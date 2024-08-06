<template>
    <main class="flex flex-col gap-14 pt-20 items-center w-full h-full  overflow-hidden">
        <!-- Background gradients decorations -->
        <div class="absolute inset-0 bg-combined-gradient"></div>
        <div class="absolute top-[-50%] left-[25%] bg-gradient-radial-2 w-[50vw] h-[50vw] rounded-full blur-[350px]">
        </div>
        <!-- Comoponent modal -->
        <Modal v-if="isModalVisible" @resetQuiz="reset" />
        <!-- container Loading and Error message -->
        <div v-show="loading || errorMessage" class="flex h-[85%]  justify-center items-center">
            <!-- Loader component -->
            <Loader :isLoading="loading" />
            <!-- Error message -->
            <h2 class="text-3xl">{{ errorMessage }}</h2>
        </div>

        <!-- Game -->
        <section v-if="quizData"
            class="w-[80vw] min-h-[300px] bg-black/70 p-10 z-10 rounded-lg flex flex-col justify-center relative ">
            <!-- Component Progress Bar -->
            <ProgressBar :widthBar="progressBarWidth" :count="countCorrectAnswers" :quizDataLength="quizData.length" />
            <!-- Component Questions -->
            <Questions v-show="currentQuestion" :CurrentQuestion="currentQuestion"
                :multipleAnswers="multipleCorrectAnswers" />
            <!-- Open modal button at last question -->
            <button v-if="finalQuestion && isAnswerSelected" @click="openModal"
                class="absolute bottom-5 right-5 border-2 text-lime-400 border-lime-400 px-5 py-3 rounded-lg hover:border-[#cc00ff] hover:text-white duration-300 transition-colors">
                Finish the game
            </button>
            <!-- Feedback for users on the current question -->
            <span v-else class="absolute bottom-5 right-5">Question {{ currentQuiz + 1 }}</span>
        </section>
        <!-- Answers container-->
        <section v-if="quizData" class="z-10 w-[70vw]">
            <!-- Answers component -->
            <Answers :answersSelected="isAnswerSelected" :filteredAnswers="filteredAnswers(currentQuestion.answers)"
                :idAnswers="id_Answers"
                :condition="(selectedAnswers.length <= correctAnswers && currentQuiz >= lastAnswered && isAnswerSelected)"
                @ButtonClass="buttonClass" @SelectAnswers="selectAnswer" />
        </section>

        <!-- Navigation Buttons -->
        <button
            class="text-6xl z-10 fixed right-10 top-[50%] translate-y-[-50%] opacity-80 hover:opacity-100 duration-300"
            v-if="isAnswerSelected && !finalQuestion" @click="nextQuestion"
            :disabled="currentQuiz >= quizData.length - 1">
            <svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg"
                transform="rotate(180)">
                <path
                    d="M56.25 12.5H50V18.75H43.75V25H37.5V31.25H31.25V43.75H37.5V50H43.75V56.25H50V62.5H56.25V12.5ZM18.75 12.5H25V62.5H18.75V12.5Z"
                    fill="url(#paint0_linear_1)" />
                <defs>
                    <linearGradient id="paint0_linear_1" x1="37.5" y1="2.5" x2="37.5" y2="42.5"
                        gradientUnits="userSpaceOnUse">
                        <stop stop-color="white" />
                        <stop offset="1" stop-color="#CC00FF" />
                    </linearGradient>
                </defs>
            </svg>
        </button>

        <button
            class="text-6xl z-10 left-10 top-[50%] translate-y-[-50%] fixed opacity-80 hover:opacity-100 duration-300"
            v-if="(currentQuiz > 0)" @click="previousQuestion">
            <svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg"
                transform="rotate(360)">
                <path
                    d="M56.25 12.5H50V18.75H43.75V25H37.5V31.25H31.25V43.75H37.5V50H43.75V56.25H50V62.5H56.25V12.5ZM18.75 12.5H25V62.5H18.75V12.5Z"
                    fill="url(#paint0_linear_2)" />
                <defs>
                    <linearGradient id="paint0_linear_2" x1="37.5" y1="12.5" x2="57.5" y2="92.5"
                        gradientUnits="userSpaceOnUse">
                        <stop stop-color="#CC00FF" />
                        <stop offset="1" stop-color="white" />
                    </linearGradient>
                </defs>
            </svg>
        </button>
    </main>
</template>

<script>
import getQuiz from '../api/apiQuiz.js';
import Modal from '../components/viewQuizComponents/Modal.vue';
import Loader from '../components/viewQuizComponents/Loader.vue';
import Questions from '../components/viewQuizComponents/Questions.vue';
import ProgressBar from '../components/viewQuizComponents/ProgressBar.vue';
import Answers from '../components/viewQuizComponents/Answers.vue';
import correctSound from '../assets/sounds/correct.mp3';
import incorrectSound from '../assets/sounds/incorrect.mp3';

export default {
    name: 'Quiz',
    components: {
        Modal,
        Loader,
        Questions,
        ProgressBar,
        Answers
    },
    data() {
        return {
            id_Answers: [ "a", "b", "c", "d", "e", "f" ],
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
            isLastAnswerSelected: false,
            isModalVisible: false,
            lastAnswered: -1
        };
    },
    computed: {
        currentQuestion() {
            return this.quizData ? this.quizData[ this.currentQuiz ] : {};
        },
        finalQuestion() {
            return this.quizData ? this.currentQuiz === this.quizData.length - 1 : false;
        },
        multipleCorrectAnswers() {
            return this.quizData ? this.quizData[ this.currentQuiz ].multiple_correct_answers === 'true' : false
        },
        progressBarWidth() {
            const totalQuestions = this.quizData.length;
            const progressPercentage = totalQuestions > 0 ? (this.countCorrectAnswers / totalQuestions) * 100 : 0;
            return `${progressPercentage}%`;
        }
    },
    methods: {

        //Obtenemos los datos del Quiz
        async fetchQuiz() {
            this.loading = true;
            this.errorMessage = null;
            try {
                const params = {
                    limit: this.limit,
                    category: this.category
                };
                this.quizData = await getQuiz(params);
                console.log("quizData", this.quizData);
            } catch (error) {
                this.errorMessage = error.response ?
                    `Error: ${error.response.status} - ${error.response.data}` :
                    'Error: No response received from the server';
                console.error('Error fetching quiz data:', error);
            } finally {
                this.loading = false;
            }
        },

        // Filtramos las preguntas para obtener solo las que no son null.
        filteredAnswers(answers) {
            return Object.values(answers).filter(answer => answer);
        },
        playCorrectSound() {
            const audio = new Audio(correctSound);
            audio.play();
        },

        playIncorrectSound() {
            const audio = new Audio(incorrectSound);
            audio.play();
        },
        // Método de Selección 
        selectAnswer(index) {
            if (this.isAnswerSelected) return; // Previene la selección si ya se selecciono una respuesta.

            //Comprobamos si hay multiples respuestas correctas.
            const multipleCorrect = this.currentQuestion.multiple_correct_answers === 'true';

            //Capturamos la respuesta selecciona mediante evento @Click y el indice.
            const selectedAnswer = `answer_${this.id_Answers[ index ]}`;

            //Capturamos mediante le método getCorrectAnswers() las respuestas correctas
            this.correctAnswers = this.getCorrectAnswers();

            if (multipleCorrect) {
                // Si hay multiples respuestas llamamos a updateMultipleSelections() que almacena en un array las multiples selecciones
                this.updateMultipleSelections(index);
            } else {

                // Si no hay multiples respuestas llamamos a updateSingleSelection()
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
        },

        updateSingleSelection(index) {
            this.selectedAnswers = [ index ];
            this.isAnswerSelected = true; // Bloquea la selección adicional si se selecciona la respuesta correcta

        },

        checkSelectionIsNotCorrect(selectedAnswer) {
            if (!this.correctAnswers.includes(selectedAnswer)) {
                this.isAnswerSelected = true; // Bloquea la selección adicional si se selecciona una respuesta incorrecta

            }
        },

        checkAllCorrectAnswersSelected() {
            // Convertimos selectedAnswers a un conjunto para eliminar duplicados
            const uniqueSelectedAnswers = Array.from(new Set(this.selectedAnswers));

            // Verificamos que todas las respuestas seleccionadas estén en correctAnswers
            const allSelectedCorrect = uniqueSelectedAnswers.every(eIndex =>
                this.correctAnswers.includes(`answer_${this.id_Answers[ eIndex ]}`)
            );

            // Verificamos que el número de respuestas seleccionadas sea igual al número de respuestas correctas
            const allCorrectSelected = this.correctAnswers.length === uniqueSelectedAnswers.length;

            // Si todas las respuestas seleccionadas son correctas y todas han sido seleccionadas, bloqueamos más selecciones
            if (allSelectedCorrect && allCorrectSelected) {
                this.isAnswerSelected = true; // Bloquea la selección adicional si se seleccionan todas las respuestas correctas.
                this.countCorrectAnswers++;
            }
        },
        getCorrectAnswers() {
            return Object.keys(this.currentQuestion.correct_answers)
                .filter(key => this.currentQuestion.correct_answers[ key ] === 'true')
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
            // Verificamos si estamos avanzando a una nueva pregunta
            if (this.currentQuiz < this.quizData.length - 1) {
                this.currentQuiz++;
                // Si estamos avanzando a una pregunta que aún no ha sido contestada
                if (this.currentQuiz >= this.lastAnswered) {
                    // Reiniciamos el estado de la selección
                    this.selectedAnswers = [];
                    this.correctAnswers = [];
                    this.isAnswerSelected = false;
                }
                // Actualizamos el índice de la última pregunta contestada
                this.lastAnswered = Math.max(this.lastAnswered, this.currentQuiz);
            }
        },

        // Método para retroceder a la pregunta anterior
        previousQuestion() {
            // Verificamos si estamos retrocediendo

            if (this.currentQuiz > 0) {
                this.currentQuiz--;
                this.selectedAnswers = [];
                // Aquí no reiniciamos el estado, simplemente mostramos las respuestas seleccionadas previamente
                this.isAnswerSelected = true; // Desactivamos la posibilidad de cambiar respuestas
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
    mounted() {
        this.fetchQuiz();

    },

};
</script>

<style></style>
