<template>
    <ul class="grid grid-cols-1 gap-5 lg:grid-cols-2 z-10 md:gap-10">
        <li v-for="(answer, index) in filteredAnswers" :key="index" class="flex ">
            <button class="py-5 px-5 rounded-xl border-2 border-custom-purple flex-grow flex items-center duration-300 transition-colors text-base lg:text-xl"
                :class="[condition ? 'hover:bg-[#8331A5]/50' : '', emitSelection(index)]"
                @click="emitSelectionAnswers(index)" :disabled="answersSelected || null">
                <div class="flex-shrink-0">{{ `${idAnswers[index]} ) ` }}</div>
                <span class="pl-3 text-start">{{ answer }}</span>
            </button>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'Answers',
    props: {
        answersSelected: {
            type: Boolean,
        },
        filteredAnswers: {
            type: Array,
            required: true
        },
        condition: {
            type: Boolean,
            required: true
        },
        idAnswers: {
            type: Array,
            required: true
        }
    },
    methods: {
        emitSelection(index) {
            this.$emit('ButtonClass', index);
            return this.$parent.buttonClass(index);
        },
        emitSelectionAnswers(index) {
            this.$emit('SelectAnswers', index);
        }
        
    }
}
</script>