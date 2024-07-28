import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/router.js"

const app = createApp(App); //creación de la instancia .vue y crea el componente app
app.use(router); //app usa router y se va a montar en un html que contenga el id app
app.mount("#app");

