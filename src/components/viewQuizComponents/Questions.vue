<template>
    <!-- Questions -->
    <div>

        <h2 v-if="CurrentQuestion.question"
            class=" leading-loose text-2xl text-center text-balance py-2 text-gradient ">{{
                CurrentQuestion.question }}</h2>
        <span class="absolute bottom-2 right-[40%] text-[#1ffffb] animate-pulse" v-show="multipleAnswers">
            Select all the correct answers
        </span>
    </div>
</template>

<script>
export default {
    name: 'Questions',
    props: {
        CurrentQuestion: {
            type: Object,
            required: true
        },
        multipleAnswers: {
            type: Boolean,
            required: true
        },

    },

}
</script>

<style></style>
