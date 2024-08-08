<template>
  <router-view />
</template>

<script>
import { useAuthStore } from './stores/authStore'; // Ajusta la ruta si es necesario

export default {
  name: 'App',
  async created() {
    const authStore = useAuthStore();
    await authStore.fetchUser(); // Sincroniza el estado de autenticación
  },
}
</script>

