<template>
    <nav class="flex items-center justify-center w-full h-[130px] bg-black/30 absolute top-0 z-40">
      <div class="flex justify-between items-center w-[80vw]">
        <div>
          <router-link to="/"><img src="../assets/icons/logo.png" alt="Logo Askode"></router-link>
        </div>
  
        <div class="flex gap-4 items-center">
          <router-link v-if="!isGamePage" to="/game">
            <button class="uppercase w-36 h-12 text-xl rounded-lg bg-custom-purple">Play</button>
          </router-link>
  
          <div v-if="!isLoginPage && !authStore.isAuthenticated" class="flex items-center">
            <router-link to="/login">
              <button class="uppercase w-36 h-12 text-xl rounded-lg border border-custom-purple">Login</button>
            </router-link>
          </div>
  
          <div v-if="authStore.isAuthenticated" class="flex items-center gap-4">
            <button class="uppercase w-36 h-12 text-xl rounded-lg border border-custom-purple">
              {{ authStore.userName }}
            </button>
            <button @click="handleLogout" class="flex justify-center items-center uppercase w-6 h-12 text-xl rounded-md border border-custom-purple">
              <img src="../assets/icons/logout.png" alt="Logout icon">
            </button>
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { useAuthStore } from '../stores/authStore';
  
  export default {
    name: 'Navbar',
    setup() {
      const route = useRoute();
      const authStore = useAuthStore();
  
      const isGamePage = computed(() => route.path === "/game");
      const isLoginPage = computed(() => route.path === "/login");
  
      const handleLogout = async () => {
        try {
          await authStore.logout();
          
          this.$router.push('/login');
        } catch (error) {
          console.error('Logout failed: ', error.message);
        }
      };
  
      return {
        isGamePage,
        isLoginPage,
        authStore,
        handleLogout,
      };
    },
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
  