<template>
    <Navbar />
    <section class="flex flex-col gap-14 pt-20 items-center w-full h-full mt-20 overflow-hidden">
        <!-- background gradients decorations -->
        <div class="absolute inset-0 bg-combined-gradient"></div>
    
        <div class="absolute top-[-50%] left-[25%] bg-gradient-radial-2 w-[50vw] h-[50vw] rounded-full blur-[350px]">
        </div>
    
        <div class="w-[80vw] min-h-[240px] bg-black/70 py-5 z-50 rounded-lg flex justify-center items-center">
            <!-- GameOver -->
            <h2 class="text-5xl text-center text-gradient">{{ displayedCategoryText }}</h2>
        </div>
        <!-- Selection buttons -->
        <div class="flex flex-col gap-20 z-10 w-fit">
            <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 z-10 gap-x-16 gap-y-10">
                <li class="flex" v-for="category in categories" :key="category.id">
                    <button 
                    :class="{ 'border-green-500 ': selectedCategory === category.name }"
                    class="py-5 px-5 rounded-lg border-2 border-custom-purple w-full flex-grow flex-wrap flex items-center duration-300 hover:bg-purple-300/20" 
                    @click="selectCategory(category.name)">
                    <span class="mx-auto">{{ category.name }}</span>
                </button>
                </li>
            </ul>
            <button 
            class="border-2 border-custom-purple w-fit text-center text-2xl font-title py-5 px-5 rounded-lg self-center"
            :disabled="!category" @click="startGame" :class="!category ? 'disabled' : 'animate-pulse'">
                Press Start
            </button>
        </div>
    </section>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import { useQuizDataStore } from '../stores/useQuizDataStore';
import { mapActions } from 'pinia';
import correctSound from '../assets/sounds/correct.mp3';

export default {
    name: 'Categories',
    components: {
        Navbar
    },
    data() {
        return {
            categories: [
                { id: 1, name: 'Linux' },
                { id: 2, name: 'bash' },
                { id: 3, name: 'uncategorized' },
                { id: 4, name: 'Docker' },
                { id: 5, name: 'SQL' },
                { id: 6, name: 'CMS' },
                { id: 7, name: 'Code' },
                { id: 8, name: 'DevOps' }
            ],
            category: null,
            selectedCategory: null,
            difficulty: ['easy', 'medium', 'hard'],
            limit: 10,
            displayedCategoryText: '',
            typingCounter: 0,
            typingDelay: 50, // 50ms per character
        };
    },
    methods: {
        ...mapActions(useQuizDataStore, ['fetchData', 'setCategory']),
        selectCategory(category) {
            this.category = category;
            this.selectedCategory = category;
            this.setCategory(category);
            localStorage.setItem('selectedCategory', category);
            console.log(this.category);
            this.fetchData({
                limit: this.limit,
                category: this.category
            });
            this.playCorrectSound();
        },
        startGame() {
            if (this.category) {
                this.$router.push('/game');
            }
        },
        playCorrectSound() {
            const audio = new Audio(correctSound);
            audio.volume = 0.2; // Adjust volume to 20%
            audio.play();
        },
        startTypingCategoryEffect() {
            this.resetTypingData();
            const text = "Select category";
            for (let i = 0; i < text.length; i++) {
                setTimeout(() => {
                    this.displayedCategoryText += text[i];
                }, this.typingDelay * this.typingCounter);
                this.typingCounter += 1;
            }
        },
        resetTypingData() {
            this.displayedCategoryText = "";
            this.typingCounter = 0;
        },
    },
    mounted() {
        this.category = null;
        this.startTypingCategoryEffect();
    }
}
</script>

<style>
.disabled {
    pointer-events: none;
    opacity: 0;
}
</style>
