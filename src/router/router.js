import Home from "../views/Home.vue";
import Game from "../views/Game.vue";
import NotFound from "../views/NotFound.vue";
import { createWebHistory, createRouter } from 'vue-router';

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/game", name: "game", component: Game },
  { path: "/:path(.*)", component: NotFound }, // los :path(.*) y demás quiere decir que cualquier cosa que no esté definida te lleve al component: NotFound
];

//creación instancia del router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router