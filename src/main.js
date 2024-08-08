import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import router from './router/router.js';
import { useAuthStore } from './stores/authStore';

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

// Inicializa el store de autenticación
const authStore = useAuthStore(pinia);
authStore.initialize().then(() => {
  // Puedes hacer algo después de que se haya inicializado el authStore
}).catch(error => {
  console.error('Error initializing auth store:', error);
});

app.mount("#app");
