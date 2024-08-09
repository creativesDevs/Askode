<template>
    <div v-show="isLoading" >
        <span class="loader text-2xl xl:text-8xl">Loading...</span>
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
    color: #ea00ff;
    animation: loading 1s linear infinite alternate;
}

@keyframes loading{
    to {
        opacity: 0;
    }
}
</style>
