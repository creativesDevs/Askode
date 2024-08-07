import Home from "../views/Home.vue";
import Quiz from "../views/Quiz.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Forgot from "../views/Forgot.vue";
import NotFound from "../views/NotFound.vue";
import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/game", name: "quiz", component: Quiz },
  { path: "/login", name: "login", component: Login},
  { path: "/signup", name: "signup", component: Signup},
  { path: "/forgot", name: "forgot", component: Forgot},
  { path: "/:path(.*)", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
