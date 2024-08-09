import Home from "../views/Home.vue";
import Quiz from "../views/Quiz.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import NotFound from "../views/NotFound.vue";
import Categories from "../views/Categories.vue";
import { createWebHistory, createRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore'; 

const routes = [
  { path: "/", name: "home", component: Home },
  { 
    path: "/game", 
    name: "quiz", 
    component: Quiz,
    meta: { requiresAuth: true } 
  },
  { 
    path: "/categories", 
    name: "categories", 
    component: Categories,
    meta: { requiresAuth: true } 
  },
  { path: "/login", name: "login", component: Login},
  { path: "/signup", name: "signup", component: Signup},
  
  
  { path: "/:path(.*)", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authStore.isAuthenticated) {
      next({
        name: 'login',
        query: { redirect: to.fullPath } 
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
