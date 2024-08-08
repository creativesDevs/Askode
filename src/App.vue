<template>
  <router-view />
</template>

<script>
import { useAuthStore } from './stores/authStore'; // Ajusta la ruta si es necesario

export default {
  name: 'App',
  async created() {
    const authStore = useAuthStore();
    try {
      await authStore.fetchUserName(); // Sincroniza el estado de autenticación
    } catch (error) {
      console.error('Error fetching user name:', error);
    }
  },
}
</script>

<style>
</style>


