import Home from "../views/Home.vue";
import Quiz from "../views/Quiz.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Forgot from "../views/Forgot.vue";
import NotFound from "../views/NotFound.vue";
import Categories from "../views/Categories.vue";
import { createWebHistory, createRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore'; // Importa el store de autenticación

const routes = [
  { path: "/", name: "home", component: Home },
  { 
    path: "/game", 
    name: "quiz", 
    component: Quiz,
    meta: { requiresAuth: true } // Añade meta información para indicar que requiere autenticación
  },
  { 
    path: "/categories", 
    name: "categories", 
    component: Categories,
    meta: { requiresAuth: true } // Añade meta información para indicar que requiere autenticación
  },
  { path: "/login", name: "login", component: Login},
  { path: "/signup", name: "signup", component: Signup},
  // ToDo: implement forgot password feature
  // { path: "/forgot", name: "forgot", component: Forgot},
  { path: "/:path(.*)", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Añade una guardia global de navegación
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore(); // Obtén el store de autenticación
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Esta ruta requiere autenticación, verifica si el usuario está autenticado
    if (!authStore.isAuthenticated) {
      // Si no está autenticado, redirige a la página de login
      next({ name: 'login' });
    } else {
      // Si está autenticado, permite el acceso
      next();
    }
  } else {
    // Si la ruta no requiere autenticación, permite el acceso
    next();
  }
});

export default router;
