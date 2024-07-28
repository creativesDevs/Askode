<template>
    <section>
        <div v-if="quizData">
            <span>
                Question {{indexQuiz+1}}: {{quizData[indexQuiz].question}}
            </span>
        </div>
    </section>
</template>


<script>
import getQuiz from "../api/api";
export default {
    name: "Game",
    data() {
        return {
            quizData: null,
            limit: 10, //para que nos de un max. de 10 preguntas y no las 20 que vendrían por defecto
            category: "Code", //para que nos de preguntas sólo de código no preguntas random
            errorMessage: null,
            indexQuiz: 0,
        };
    },
    mounted(){ //método para que cuando se monte el componente se almacene los datos en quizData
        this.fetchQuiz()
    },

    methods: {
        async fetchQuiz() {
            try {
                const params = {
                    limit: this.limit, //llama al limit declarado en data y le mete el valor de 10 en el limit
                    category: this.category,
                };
                this.quizData = await getQuiz(params);
            } catch (error) {
                this.errorMessage = "Error: ";
                if (error.response) {
                    this.errorMessage += `${error.response.status} - ${error.response.data}`;
                } else if (error.request) {
                    this.errorMessage += "no response received from the server";
                } else {
                    this.errorMessage += error.message;
                }
            }
        },
    },
};

</script>

<style></style>