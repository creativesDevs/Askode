<template>
<div class="flex flex-col overflow-hidden relative">

  <div class="absolute inset-0 bg-combined-gradient z-10"></div>
  <div class="absolute top-[-10%] left-[25%] bg-gradient-radial-2 w-[50vw] h-[40vw] rounded-full blur-[300px] z-20"></div>

  <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-radial-2 w-[80vw] h-[40vh] rounded-full blur-[300px] z-20"></div>

  <div class="absolute -bottom-96 -left-52 bg-gradient-radial-2 w-[40vw] h-[40vh] rounded-full blur-[250px] z-20">
    </div>
    <div class="absolute bottom-24 -right-24 bg-gradient-radial-2 w-[40vw] h-[40vh] rounded-full blur-[250px] z-20">
    </div>
    <img class="absolute top-5 left-1/2 transform -translate-x-1/2 h-screen opacity-30" src="../assets/img/isiahzac_A_vintage_bulky_purple_retro_computer_viewed_from_the__e9535847-46eb-4532-b126-81686cdc0852-removebg-preview.png" alt="Computer image">

  <Navbar/>

  <section class="flex justify-center items-center h-screen z-30">
    <div class="h-[65vh] w-[80vw] flex flex-col items-center justify-center gap-16 mt-10 text-center">
      <h1 class="flex flex-col uppercase text-9xl text-center gap-8">
        <span class="text-gradient">Quiz for</span>
        <span class="text-gradient">coders</span>
      </h1>

      <p class="w-full max-w-4xl text-xl text-balance">
        Test your knowledge across various subjects, customize the difficulty to suit your level, and receive immediate
        feedback. Enhance your coding abilities today!
      </p>

        <button class="uppercase w-36 h-12 text-xl rounded-lg bg-custom-purple" @click="goToCategories">Play</button>

    </div>
  </section>

  <MarqueeSection/>

  <section class="flex flex-col items-center w-full h-auto gap-[130px] mt-[205px] z-30">
    <h2 class="uppercase text-6xl text-gradient">More than a game</h2>

    <div class="flex justify-between w-[80%]">
      <div class="w-[700px] h-[450px] rounded-lg overflow-hidden">
        <img class="object-cover w-full h-full"
          src="../assets/img/isiahzac_A_real_girl_playing_quiz_games_on_a_computer._Nice_bac_701b83e8-a654-4775-b63b-c55075940769.png"
          alt="A girl playing on the computer">
      </div>
      <div class="w-[700px] h-[450px] rounded-lg overflow-hidden">
        <img class="object-cover w-full h-full"
          src="../assets/img/isiahzac_A_real_guy_playing_quiz_games_on_a_computer._Nice_back_3f605f42-e166-4220-abf4-08ad64913844.png"
          alt="A guy playing on the computer">
      </div>
    </div>
  </section>

  <section class="flex flex-col items-center w-full h-auto gap-[130px] mt-[205px] z-30">
    <h2 class="uppercase text-6xl text-gradient">Our mission</h2>

    <div class="flex justify-between w-[80%] mx-auto">
      <div class="flex flex-col items-center justify-center text-center p-8 w-[450px] h-auto rounded-lg bg-black/60 gap-5">
        <img class="w-[75px] h-[75px]" src="../assets/icons/challenge.png" alt="Challenge icon">
        <h3 class="text-xl uppercase">Targeted Skill Growth</h3>
        <p class="leading-6 text-lg text-balance">Sharpen your coding skills and deepen your tech knowledge with targeted quizzes
          designed for growth.</p>
      </div>
      <div class="flex flex-col items-center justify-center text-center p-8 w-[450px] h-auto rounded-lg bg-black/60 gap-5">
        <img class="w-[75px] h-[75px]" src="../assets/icons/knowledge.png" alt="Knowledge icon">
        <h3 class="text-xl uppercase">Engaging Challenges</h3>
        <p class="leading-6 text-lg text-balance">Our quizzes challenge and motivate you, making learning an enjoyable and engaging
          experience.</p>
      </div>
      <div class="flex flex-col items-center justify-center text-center p-8 w-[450px] h-auto rounded-lg bg-black/60 gap-5">
        <img class="w-[75px] h-[75px]" src="../assets/icons/difficulty.png" alt="Difficulty icon">
        <h3 class="text-xl uppercase">Customizable Learning</h3>
        <p class="leading-6 text-lg text-balance">Tailor your learning with adjustable difficulty levels, from beginner to advanced.
          Our app adapts to your needs.</p>
      </div>
    </div>
  </section>

  <section class="flex flex-col items-center w-full h-auto gap-[130px] mt-[205px] z-30">
    <h2 class="uppercase text-6xl text-gradient">Start playing</h2>

    <div class="flex flex-col items-center gap-16 text-center">
      <p class="w-[1000px] text-xl text-balance">Dive into our engaging programming quizzes and start enhancing your
      skills today. Challenge yourself and see how much you can achieve!</p>
      
        <button class="uppercase w-48 h-12 text-xl rounded-lg bg-custom-purple" @click="goToCategories">Play now</button>

    </div>
  </section>

  <Footer />
</div>
</template>

<script>
import MarqueeSection from '../components/Marquee.vue';
import Footer from '../components/Footer.vue';
import Navbar from '../components/Navbar.vue';
export default {
  name: 'Home',
  components: {
    MarqueeSection,
    Footer,
    Navbar,
  },
  methods: {
    goToCategories() {
      this.$router.push('/categories')
    }
  }
}
</script>

<style scoped>
    button {
        transition: 0.3s ease-in-out;
    }
    button:hover {
        background: #8331A5;
        transition: 0.3s ease-in-out;
    }
</style>
