<template>
  <router-view />
</template>

<script>
import { useAuthStore } from './stores/authStore'; 

export default {
  name: 'App',
  async created() {
    const authStore = useAuthStore();
    await authStore.fetchUserName(); // Sincroniza el estado de autenticación
  },
}
</script>

