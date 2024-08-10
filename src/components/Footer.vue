<template>
  <footer class="flex justify-center bg-black/30 w-full h-[130px] mt-[205px] z-40">
    <div class="flex items-center justify-between w-[80vw]">
      <div class="text-white">
        <p>2024 © All rights reserved</p>
      </div>
      <div class="flex">
        <a 
          v-for="(icon, index) in networks" 
          :key="index" 
          :href="icon.url" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="flex items-center justify-center w-[35px] h-[35px] mx-6"
        >
          <img :src="icon.src" :alt="icon.alt" class="w-full h-full object-cover">
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
import linkedinIcon from '../assets/icons/linkedin.png';
import instagramIcon from '../assets/icons/instagram.png';
import xIcon from '../assets/icons/x.png';
export default {
  name: 'Footer',
  data() {
    return {
      networks: [
        { src: linkedinIcon, alt: 'LinkedIn icon', url: 'https://www.linkedin.com' },
        { src: instagramIcon, alt: 'Instagram icon', url: 'https://www.instagram.com' },
        { src: xIcon, alt: 'X icon', url: 'https://www.x.com' }
      ]
    };
  }
};
</script>

<style scoped>
p {
  color: #CC00FF;
}

a img {
  color: #CC00FF;
}
</style>
