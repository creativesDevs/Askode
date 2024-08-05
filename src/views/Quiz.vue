<template>
    <main class="flex flex-col gap-14 pt-20 items-center w-full h-screen  overflow-hidden">
        <!-- background gradients decorations -->
        <div class="absolute inset-0 bg-combined-gradient"></div>

        <div class="absolute top-[-50%] left-[25%] bg-gradient-radial-2 w-[50vw] h-[50vw] rounded-full blur-[350px]">
        </div>
        <!-- container Loading and Error message -->
        <div v-if="loading || errorMessage" class="flex h-[85%]  justify-center items-center">
            <div v-show="loading" class="text-8xl loading02">
                <span>L</span>
                <span>O</span>
                <span>A</span>
                <span>D</span>
                <span>I</span>
                <span>N</span>
                <span>G</span>
            </div>
            <span class="text-red-500 text-2xl">{{ errorMessage }}</span>
        </div>

        <!-- Game -->
        <div v-if="quizData"
            class="w-[80vw] min-h-[300px] bg-black/70 p-10 z-10 rounded-lg flex flex-col justify-center relative ">
            <!-- Progress Bar -->
            <div
                class="w-full max-w-[80vw] h-10 border-t-2 border-[#e08eeb76] rounded-t-lg absolute top-0 left-0 z-50 ">
                <div class="bg-[#68ff1dbe] h-full rounded-t-lg transition-all duration-300"
                    :style="{ width: progressBarWidth }"></div>
                <span class="absolute inset-0 flex items-center justify-center text-white">
                    Correct answers: {{ countCorrectAnswers }} of {{ quizData.length }}
                </span>
            </div>
            <!-- Questions -->
            <h3 class="text-2xl text-center py-2 text-gradient">{{ currentQuestion.question }}</h3>
            <span class="absolute bottom-2 right-[40%] text-[#1ffffb] animate-pulse" v-show="multipleCorrectAnswers">
                Select all the correct answers
            </span>
            <button v-if="finalQuestion && isAnswerSelected" @click="reset"
                class="absolute bottom-5 right-5 border-2 text-lime-400 border-lime-400 px-5 py-3 rounded-lg hover:border-[#cc00ff] hover:text-white duration-300 transition-colors">Reset
                Quiz</button>
            <span v-else class="absolute bottom-5 right-5">Question {{ currentQuiz + 1 }}</span>
        </div>
        <!-- answers -->
        <div v-if="quizData" class="z-10 w-[70vw]">
            <ul class="grid grid-cols-2 z-10 gap-10">
                <li v-for="(answer, index) in filteredAnswers(currentQuestion.answers)" :key="index" class="flex ">
                    <button
                        class="py-5 px-5 rounded-xl border-2 border-white flex-grow flex items-center duration-300 transition-colors "
                        :class="selectedAnswers.length === 0 && !isAnswerSelected ? 'hover:bg-purple-300/30' : buttonClass(index)"
                        @click="selectAnswer(index)" :disabled="isAnswerSelected">
                        <div class="flex-shrink-0">{{ `${id_Answers[index]} ) ` }}</div>
                        <span class="pl-3 text-start">{{ answer }}</span>
                    </button>
                </li>
            </ul>
        </div>

        <!-- Navigation Buttons -->
        <button
            class="text-6xl z-10 fixed right-10 top-[50%] translate-y-[-50%] opacity-80 hover:opacity-100 duration-300"
            v-if="isAnswerSelected && quizData" @click="nextQuestion" :disabled="currentQuiz >= quizData.length - 1">
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

export default {
    name: 'Quiz',
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
            multipleCorrectAnswers: false,

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

            this.checkSelectionIsNotCorrect(selectedAnswer);
            this.checkAllCorrectAnswersSelected();
        },

        updateMultipleSelections(index) {
            this.selectedAnswers.push(index);
        },

        updateSingleSelection(index) {
            this.selectedAnswers = [ index ];
            this.isLastAnswerSelected = true
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
                this.selectedAnswers = []
                // Aquí no reiniciamos el estado, simplemente mostramos las respuestas seleccionadas previamente
                this.isAnswerSelected = true; // Desactivamos la posibilidad de cambiar respuestas
            }
        }
        ,
        reset() {
            this.currentQuiz = 0;
            this.selectedAnswers = [];
            this.correctAnswers = [];
            this.countCorrectAnswers = 0;
            this.lastAnswered = -1;
            this.isAnswerSelected = false;
            this.errorMessage = null;
            this.loading = false;
            this.multipleCorrectAnswers = false;
        },
    },
    mounted() {
        this.fetchQuiz();
        this.lastAnswered = -1; // Inicializamos con -1 porque ninguna pregunta ha sido contestada al principio
    }
};
</script>

<style></style>
