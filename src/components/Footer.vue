<template>
    <footer class="flex justify-center bg-black/40 w-full h-[130px]">
        <div class="flex items-center justify-between w-[80wv]">
            <div class="text-white">
                <p>All rights reserved</p>
            </div>
            <div class="flex">
                <div v-for="(icon, index) in networks" :key="index"
                    class="flex items-center justify-center bg-icon-cards/40 w-[45px] h-[45px] mx-6">
                    <img :src="icon.src" :alt="icon.alt" class="w-full h-full object-cover">
                </div>
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
          { src: 'src/assets/icons/linkedin.png', alt: 'Linkedin icon' },
          { src: 'src/assets/icons/instagram.png', alt: 'Instagram icon' },
          { src: 'src/assets/icons/x.png', alt: 'X icon' }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  </style>
  