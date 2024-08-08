<template>
  <router-view />
</template>

<script>
import { useAuthStore } from './stores/authStore';
import { useRouter } from 'vue-router';
import { watch } from 'vue';

export default {
  name: 'App',
  async created() {
    const authStore = useAuthStore();
    const router = useRouter();

    try {
      await authStore.fetchUserName(); // Sincroniza el estado de autenticación
    } catch (error) {
      console.error('Error fetching user name:', error);
    }

    // Watcher para redirigir al home si el usuario se desloguea
    watch(
      () => authStore.isAuthenticated, 
      (newValue) => {
        if (!newValue) {
          router.push('/'); 
        }
      }
    );
  },
}
</script>

<style>
</style>
