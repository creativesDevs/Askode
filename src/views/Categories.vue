<template>
    <section class="flex flex-col gap-14 pt-20 items-center w-full h-screen overflow-hidden">
        <!-- background gradients decorations -->
        <div class="absolute inset-0 bg-combined-gradient"></div>
    
        <div class="absolute top-[-50%] left-[25%] bg-gradient-radial-2 w-[50vw] h-[50vw] rounded-full blur-[350px]">
        </div>
    
        <div class="w-[80vw] min-h-[300px] bg-black/70 p-10 z-50 rounded-lg flex flex-col justify-center relative items-center gap-10">
            <!-- GameOver -->
            <h2 class="text-5xl text-center py-2 text-gradient">Select category</h2>
            <button 
            class="border-2 border-custom-purple w-fit text-center text-2xl font-title py-2 px-5"
            :disabled="!category" @click="startGame" :class="{ disabled: !category }">
                Press Start
            </button>
        </div>
        <!-- Buttons modal -->
        <div class="z-10 w-[70vw]">
            <ul class="grid grid-cols-2 z-10 gap-10">
                <li class="flex" v-for="category in categories" :key="category.id">
                    <button 
                    :class="{ 'border-green-500 ': selectedCategory === category.name }"
                    class="py-5 px-5 rounded-xl border-2 border-custom-purple flex-grow flex items-center duration-300 hover:bg-purple-300/20" @click="selectCategory(category.name)">
                        <span class="pl-3 text-start">{{ category.name }}</span>
                    </button>
                </li>
            </ul>
            <button class="text-6xl z-10 fixed right-10 top-[50%] translate-y-[-50%] opacity-80 hover:opacity-100 duration-300" @click="nextQuestion">
                <svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(180)">
                    <path d="M56.25 12.5H50V18.75H43.75V25H37.5V31.25H31.25V43.75H37.5V50H43.75V56.25H50V62.5H56.25V12.5ZM18.75 12.5H25V62.5H18.75V12.5Z" fill="url(#paint0_linear_1)" />
                    <defs>
                        <linearGradient id="paint0_linear_1" x1="37.5" y1="2.5" x2="37.5" y2="42.5" gradientUnits="userSpaceOnUse">
                            <stop stop-color="white" />
                            <stop offset="1" stop-color="#CC00FF" />
                        </linearGradient>
                    </defs>
                </svg>
            </button>
    
            <button class="text-6xl z-10 left-10 top-[50%] translate-y-[-50%] fixed opacity-80 hover:opacity-100 duration-300" @click="previousQuestion">
                <svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(360)">
                    <path d="M56.25 12.5H50V18.75H43.75V25H37.5V31.25H31.25V43.75H37.5V50H43.75V56.25H50V62.5H56.25V12.5ZM18.75 12.5H25V62.5H18.75V12.5Z" fill="url(#paint0_linear_2)" />
                    <defs>
                        <linearGradient id="paint0_linear_2" x1="37.5" y1="12.5" x2="57.5" y2="92.5" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#CC00FF" />
                            <stop offset="1" stop-color="white" />
                        </linearGradient>
                    </defs>
                </svg>
            </button>
        </div>
    </section>
    </template>
    
    <script>
    import {
        RouterLink
    } from 'vue-router';
    import {
        useQuizDataStore
    } from '../stores/useQuizDataStore';
    import {
        mapActions
    } from 'pinia';
    import correctSound from '../assets/sounds/correct.mp3';
    
    export default {
        name: 'Categories',
        components: {
            RouterLink
        },
        data() {
            return {
                categories: [{
                        id: 1,
                        name: 'Linux'
                    },
                    {
                        id: 2,
                        name: 'bash'
                    },
                    {
                        id: 3,
                        name: 'uncategorized'
                    },
                    {
                        id: 4,
                        name: 'Docker'
                    },
                    {
                        id: 5,
                        name: 'SQL'
                    },
                    {
                        id: 6,
                        name: 'CMS'
                    },
                    {
                        id: 7,
                        name: 'Code'
                    },
                    {
                        id: 8,
                        name: 'DevOps'
                    }
                ],
                category: null,
                selectedCategory: null,
                difficulty: ['easy', 'medium', 'hard'],
                limit: 10
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
                this.playCorrectSound()
            },
            startGame() {
                if (this.category) {
                    this.$router.push('/game');
                }
            },
            playCorrectSound() {
                const audio = new Audio(correctSound);
                audio.volume = 0.2; // Ajusta el volumen al 50%
                audio.play();
            },
    
        },
        mounted() {
            this.category = null;
        }
    }
    </script>
    
    <style>
    .disabled {
        pointer-events: none;
        opacity: 0.5;
    }
    </style>