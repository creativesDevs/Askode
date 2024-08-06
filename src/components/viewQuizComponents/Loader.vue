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

<style>
/* HTML: <div class="loader"></div> */
.loader {
    font-weight: bold;

    font-size: 3rem;
    animation: 6 1s linear infinite alternate;
}


@keyframes l1 {
    to {
        opacity: 0
    }
}
</style>
