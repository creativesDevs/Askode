<template>
<section class="fixed inset-0 bg-black z-50" tabindex="0" ref="modal">
    <div class="flex flex-col gap-14 pt-20 items-center w-full h-screen  overflow-hidden">
        <!-- background gradients decorations -->
        <div class="absolute inset-0 bg-combined-gradient"></div>

        <div class="absolute top-[-50%] left-[25%] bg-gradient-radial-2 w-[50vw] h-[50vw] rounded-full blur-[350px]">
        </div>

        <div class="w-[80vw] min-h-[300px] bg-black/70 p-10 z-50 rounded-lg flex flex-col justify-center relative ">
            <!-- GameOver -->
            <h2 class="text-5xl text-center py-2 text-gradient">Game Over</h2>
        </div>
        <!-- Buttons modal -->
        <div class="z-10 w-[70vw]">
            <ul class="grid grid-cols-2 z-10 gap-10">
                <li class="flex ">
                    <button class="py-5 px-5 rounded-xl border-2 border-custom-purple flex-grow flex items-center duration-300" @click="resetQuiz">
                        <div class="flex-shrink-0"></div>
                        <span class="pl-3 text-start">Reset Game</span>
                    </button>
                </li>
                <li class="flex ">
                    <button class="py-5 px-5 rounded-xl border-2 border-custom-purple flex-grow flex items-center duration-300" @click="startNewGame">
                        <div class="flex-shrink-0"></div>
                        <span class="pl-3 text-start">New Game</span>
                    </button>
                </li>
            </ul>
        </div>
    </div>
</section>
</template>

<script>
import {
    useQuizDataStore
} from '../../stores/useQuizDataStore';
import {
    mapActions,
    mapState
} from 'pinia'
export default {
    name: 'Modal',
    data() {
        return {

        }
    },
    computed: {
        ...mapState(useQuizDataStore, ['category'])
    },
    methods: {
        ...mapActions(useQuizDataStore, ['fetchData']),
        resetQuiz() {
            this.$emit("resetQuiz")
        },
        startNewGame() {
            this.fetchData({
                category: this.category
            })

            this.$router.push('/game');

        },
    },
    mounted() {
        this.$refs.modal.focus()

    },
}
</script>

<style></style>
