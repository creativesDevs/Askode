import Home from "../views/Home.vue";
import Quiz from "../views/Quiz.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
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

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authStore.isAuthenticated) {
      next({
        name: 'login',
        query: { redirect: to.fullPath } // Guardar la ruta original a la que intentaba acceder
      });
    } else {
      next();
    }
  } else {
    next();
  }
});


export default router;
