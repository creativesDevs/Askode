import Home from "../views/Home.vue";
import Quiz from "../views/Quiz.vue";
import NotFound from "../views/NotFound.vue";
import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/game", name: "quiz", component: Quiz },
  { path: "/:path(.*)", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
