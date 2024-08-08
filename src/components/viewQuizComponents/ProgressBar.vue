<template>
    <div class="w-full max-w-[80vw] h-10 border-t-2 border-[#e08eeb76] rounded-t-lg absolute top-0 left-0 z-50 ">
        <div class="bg-[#68ff1d]/70 h-full {{widthBar='100%'?'rounded-tl-lg':'rounded-t-lg'}} transition-all duration-300" 
        :class="widthBar === '100%' ? 'rounded-t-lg' : 'rounded-tl-lg'" 
        :style="{ width: widthBar }"></div>
        <span class="absolute inset-0 flex items-center justify-center text-custom-purple/80 font-semibold">
            Correct answers: {{ count }} of {{ quizDataLength }}
        </span>
    </div>
</template>

<script>
export default {
    name: 'ProgressBar',
    props: {
        widthBar: {
            type: String,
            required: true
        },
        count: {
            type: Number,
            required: true
        },
        quizDataLength: {
            type: Number,
            required: true
        }
    }
}
</script>

<style></style>
