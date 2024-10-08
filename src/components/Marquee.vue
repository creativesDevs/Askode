<template>
  <section class="flex flex-col justify-center items-center z-30 gap-[130px] mt-[205px]">
    <h2 class="uppercase text-6xl text-gradient text-center">Play different categories</h2>
    <div class="w-[80vw] flex flex-col gap-12">
      <div 
        v-for="(direction, index) in directions" 
        :key="index" 
        class="scroller" 
        :data-direction="direction"
        ref="scrollers"
      >
        <ul class="icon-list scroller__inner flex justify-center items-center flex-nowrap gap-[100px] list-none">
          <li 
            v-for="(icon, i) in icons" 
            :key="icon.src" 
            class="flex justify-center items-center w-[100px] h-[100px] bg-black/20 rounded-lg"
          >
            <img 
              class="w-[50px] h-[50px]" 
              :src="icon.src" 
              :alt="icon.alt" 
            />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import bashIcon from '../assets/icons/bash.png';
import linuxIcon from '../assets/icons/linux.png';
import codeIcon from '../assets/icons/code.png';
import devopsIcon from '../assets/icons/devops.png';
import cmsIcon from '../assets/icons/cms.png';
import sqlIcon from '../assets/icons/sql.png';
import dockerIcon from '../assets/icons/docker.png';
export default {
  name: "MarqueeSection",
  data() {
    return {
      directions: ['right', 'left'],
      icons: [
        { src: bashIcon, alt: 'Bash icon' },
        { src: linuxIcon, alt: 'Linux icon' },
        { src: codeIcon, alt: 'Code icon' },
        { src: devopsIcon, alt: 'DevOps icon' },
        { src: cmsIcon, alt: 'CMS icon' },
        { src: sqlIcon, alt: 'SQL icon' },
        { src: dockerIcon, alt: 'Docker icon' }
      ]
    }
  },
  mounted() {
    if (!window.matchMedia("(prefers-reduced-motion)").matches) {
      this.addAnimation(this.$refs.scrollers);
    }
  },
  methods: {
    addAnimation(scrollers) {
      scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", true);
        
        const scrollerInner = scroller.querySelector('.scroller__inner');
        const scrollerContent = Array.from(scrollerInner.children);
        
        scrollerContent.forEach(item => {
          const duplicatedItem = item.cloneNode(true);
          duplicatedItem.setAttribute('aria-hidden', true);
          scrollerInner.appendChild(duplicatedItem);
        });
      });
    }
  }
}
</script>


<style scoped>
.scroller {
  overflow: hidden;
  position: relative;
}

.scroller[data-animated="true"] {
  -webkit-mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
  mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
}

.scroller[data-animated="true"] .scroller__inner {
  display: flex;
  width: max-content;
  animation: scroll 35s linear infinite;
}

.scroller[data-direction="right"] .scroller__inner {
  animation-direction: reverse;
}

.scroller[data-direction="left"] .scroller__inner {
  animation-direction: normal;
}

.scroller:hover .scroller__inner {
  animation-play-state: paused;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>

