<template>
    <section class="flex flex-col items-center border w-full h-auto gap-[130px]">
      <h2 class="uppercase text-7xl">Play different categories</h2>
      <div class="w-[80vw] border overflow-hidden rounded-full">
        <div v-for="(marquee, index) in marquees" :key="index" 
             :class="['flex justify-between', index === 1 ? 'marquee-2' : 'marquee', index === 0  ? 'mb-[50px]' : '', index === 1 ? 'mb-[50px]' : '']">
          <div v-for="icon in marquee" :key="icon.alt"
               class="flex items-center justify-center bg-icon-cards/40 w-[120px] h-[120px] rounded-lg">
            <img :src="icon.src" :alt="icon.alt">
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'MarqueeSection',
    data() {
      return {
        marquees: [
          [
            { src: 'src/assets/icons/bash.png', alt: 'Bash icon' },
            { src: 'src/assets/icons/linux.png', alt: 'Linux icon' },
            { src: 'src/assets/icons/code.png', alt: 'Code icon' },
            { src: 'src/assets/icons/devops.png', alt: 'Devops icon' },
            { src: 'src/assets/icons/cms.png', alt: 'CMS icon' },
            { src: 'src/assets/icons/sql.png', alt: 'SQL icon' },
            { src: 'src/assets/icons/docker.png', alt: 'Docker icon' }
          ],
          [
            { src: 'src/assets/icons/bash.png', alt: 'Bash icon' },
            { src: 'src/assets/icons/linux.png', alt: 'Linux icon' },
            { src: 'src/assets/icons/code.png', alt: 'Code icon' },
            { src: 'src/assets/icons/devops.png', alt: 'Devops icon' },
            { src: 'src/assets/icons/cms.png', alt: 'CMS icon' },
            { src: 'src/assets/icons/sql.png', alt: 'SQL icon' },
            { src: 'src/assets/icons/docker.png', alt: 'Docker icon' }
          ],
          [
            { src: 'src/assets/icons/bash.png', alt: 'Bash icon' },
            { src: 'src/assets/icons/linux.png', alt: 'Linux icon' },
            { src: 'src/assets/icons/code.png', alt: 'Code icon' },
            { src: 'src/assets/icons/devops.png', alt: 'Devops icon' },
            { src: 'src/assets/icons/cms.png', alt: 'CMS icon' },
            { src: 'src/assets/icons/sql.png', alt: 'SQL icon' },
            { src: 'src/assets/icons/docker.png', alt: 'Docker icon' }
          ]
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  .marquee {
    animation: marquee-move-text 20s linear infinite;
  }
  .marquee-2 {
    animation: marquee-move 20s linear infinite;
  }
  @keyframes marquee-move-text {
    0% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
  }
  @keyframes marquee-move {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  </style>
  