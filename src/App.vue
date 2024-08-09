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
      await authStore.fetchUserName();
    } catch (error) {
      console.error('Error fetching user name:', error);
    }

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
