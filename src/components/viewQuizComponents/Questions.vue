<template>
    <!-- Questions -->
    <div>
      <h2 v-if="CurrentQuestion.question" class="leading-loose text-2xl mx-24 text-gradient">
        {{ displayedText }}
      </h2>
      <span class="absolute bottom-4 right-[40%] text-[#1ffffb] animate-pulse" v-show="multipleAnswers">
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
      }
    },
    data() {
      return {
        displayedText: "", // Texto que se mostrará con el efecto de escritura
        counter: 0,
        delay: 30, // Ajusta el delay entre cada letra
      };
    },
    watch: {
      // Detecta cambios en la pregunta actual y reinicia el efecto de escritura
      CurrentQuestion: {
        handler() {
          this.startTypingEffect();
        },
        immediate: true
      }
    },
    methods: {
      startTypingEffect() {
        this.resetData();
        const text = this.CurrentQuestion.question || '';
  
        for (let i = 0; i < text.length; i++) {
          setTimeout(() => {
            this.displayedText += text[i];
          }, this.delay * this.counter);
          this.counter += 1;
        }
      },
      resetData() {
        this.displayedText = "";
        this.counter = 0;
      }
    }
  };
  </script>
  
  <style></style>