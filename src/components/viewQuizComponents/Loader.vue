<template>
    <div v-show="isLoading" class="text-8xl loading02">
        <span class="loader">Loading...</span>
    </div>
</template>

<script>
export default {
    name: "Loader",
    props: {
        isLoading: {
            type: Boolean,
            required: true
        }
    },


}
</script>

<style scoped>
.loader {
    font-weight: bold;
    font-size: 3rem;
    color: #333; /* Puedes ajustar el color según tus preferencias */
    animation: loading 1s linear infinite alternate;
}

@keyframes loading{
    to {
        opacity: 10%;
    }
}
</style>
