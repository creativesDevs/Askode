<template>
  <footer class="flex justify-center bg-black/20 w-full h-[130px] mt-[150px] z-40">
    <div class="flex items-center justify-between w-[80vw]">
      <div class="text-white">
        <p>2024 © All rights reserved</p>
      </div>
      <div class="flex">
        <a v-for="(icon, index) in networks" :key="index" :href="icon.url" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center w-[35px] h-[35px] mx-6">
          <img :src="icon.src" :alt="icon.alt" class="w-full h-full object-cover">
        </a>
      </div>
    </div>
  </footer>
</template>

  
  <script>
  export default {
    name: 'Footer',
    data() {
      return {
        networks: [
        { src: 'src/assets/icons/linkedin.png', alt: 'LinkedIn icon', url: 'https://www.linkedin.com' },
        { src: 'src/assets/icons/instagram.png', alt: 'Instagram icon', url: 'https://www.instagram.com' },
        { src: 'src/assets/icons/x.png', alt: 'X icon', url: 'https://www.x.com' }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  p {
    color: #CC00FF;
  }

  div img {
    color: #CC00FF;
  }
  </style>
  