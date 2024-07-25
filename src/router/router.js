
import NotFound from "./views/NotFound.vue";
import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/:path(.*)", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
