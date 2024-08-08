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

const authStore = useAuthStore(pinia);
authStore.initialize().then(() => {})
  .catch(error => {console.error('Error initializing auth store:', error);
});

app.mount("#app");
