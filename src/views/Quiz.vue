<template>
<main class="flex flex-col gap-14 items-center w-full h-full relative mt-20">
    <div class="absolute h-full w-full bg-combined-gradient "></div>

    <div class="absolute top-[-50%] left-[25%] bg-gradient-radial-2 w-[50vw] h-[50vw] rounded-full blur-[350px]"></div>
    <div v-if="loading || errorMessage">
        <div class="loading">Loading...</div>
        <span class="error">{{ errorMessage }}</span>
    </div>
    <div class="absolute w-[80vw] flex justify-between px-5" v-if="quizData">
      <span class="">Correct answers: {{ countCorrectAnswers }} of {{ this.quizData.length }}</span>
      <span class="">Question {{ currentQuiz }}</span>
      </div>
      <!-- Game -->
      <div v-if="quizData" class="w-[80vw] min-h-[300px] bg-black/70 p-10 z-10 rounded-lg flex flex-col justify-center relative">

        <h2 class="text-[2rem] text-center py-2">{{ currentQuestion.question }}</h2>
        <span class="absolute bottom-2 right-[40%] text-[#1ffffb] animate-pulse" v-if="multipleCorrectAnswers">Select all the correct answers</span>
    </div>
    <div v-if="quizData" class="z-10 w-[70vw]">

        <ul class="grid grid-cols-2 z-10  gap-x-9 gap-y-2">
            <li v-for="(answer, index) in filteredAnswers(currentQuestion.answers)" :key="index">
                <button class="py-5 px-5 rounded-full border-2 border-transparent  flex w-full" :class="buttonClass(index)" @click="selectAnswer(index)" :disabled="isAnswerSelected">
                    <div class="flex-shrink-0">{{`${id_Answers[index]} ) `}}</div> <span class="pl-3">{{ answer }}</span>
                </button>
            </li>
        </ul>
    </div>
    <!-- Buttons to move for questions -->
    <button class="text-6xl z-10 fixed right-10 top-[50%] translate-y-[-50%]" v-if="isAnswerSelected && quizData " @click="nextQuestion" :disabled="currentQuiz >= quizData.length - 1"><svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(180)">
            <path d="M56.25 12.5H50V18.75H43.75V25H37.5V31.25H31.25V43.75H37.5V50H43.75V56.25H50V62.5H56.25V12.5ZM18.75 12.5H25V62.5H18.75V12.5Z" fill="url(#paint0_linear_189_9270)" />
            <defs>
                <linearGradient id="paint0_linear_189_9270" x1="37.5" y1="12.5" x2="37.5" y2="62.5" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#CC00FF" />
                    <stop offset="1" stop-color="white" />
                </linearGradient>
            </defs>
        </svg></button>
    <button class="text-6xl z-10  left-10 top-[50%] translate-y-[-50%] fixed opacity-80 hover:opacity-100 duration-300" v-if="quizData" @click="lastQuestion"><svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(360)">
            <path d="M56.25 12.5H50V18.75H43.75V25H37.5V31.25H31.25V43.75H37.5V50H43.75V56.25H50V62.5H56.25V12.5ZM18.75 12.5H25V62.5H18.75V12.5Z" fill="url(#paint0_linear_189_9270)" />
            <defs>
                <linearGradient id="paint0_linear_189_9270" x1="37.5" y1="12.5" x2="57.5" y2="92.5" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#CC00FF" />
                    <stop offset="1" stop-color="white" />
                </linearGradient>
            </defs>
        </svg></button>
</main>
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
            multipleCorrectAnswers: false,
            
        };
    },
    computed: {
        currentQuestion() {
            return this.quizData ? this.quizData[this.currentQuiz] : {};
        },

        multipleCorrectAnswers() {
            return this.quizData ? this.quizData[this.currentQuiz].multiple_correct_answers === 'true' : false
        },
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
            /*  TODO: check if answer selected exist in selectedAnswers */
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
            // Verificamos si estamos avanzando a una nueva pregunta
            if (this.currentQuiz < this.quizData.length - 1) {
                this.currentQuiz++;
                // Si estamos avanzando a una pregunta que aún no ha sido contestada
                if (this.currentQuiz > this.lastAnswered) {
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
        lastQuestion() {
            // Verificamos si estamos retrocediendo
            if (this.currentQuiz > 0) {
                this.currentQuiz--;
                this.selectedAnswers = []
                // Aquí no reiniciamos el estado, simplemente mostramos las respuestas seleccionadas previamente
                this.isAnswerSelected = true; // Desactivamos la posibilidad de cambiar respuestas
            }
        }
    },
    mounted() {
        this.fetchQuiz();
        this.lastAnswered = -1; // Inicializamos con -1 porque ninguna pregunta ha sido contestada al principio
    }
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
    border: 2px solid green;
    color: white;
    box-sizing: border-box;
    /* Asegura que el borde no cambie el tamaño del botón */
}

.incorrect {
    border: 2px solid rgb(178, 49, 49);
    color: white;
    box-sizing: border-box;
    /* Asegura que el borde no cambie el tamaño del botón */
}

button {
    box-sizing: border-box;
    padding: 10px;
    /* Asegura que el borde no cambie el tamaño del botón */
}
</style>
