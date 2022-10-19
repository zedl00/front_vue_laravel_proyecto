import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import App from '../App.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Inicio.vue')
      //component: HomeView
    },
      /*
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    */

    {
      path: '/admin',
      name: 'Admin',
      component: App,
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('../components/Dashboard.vue')
        },
        {
          path: 'perfil',
          name: 'Perfil',
          component: () => import('../views/admin/Perfil.vue')
        },
        {
          path: 'usuario',
          name: 'Usuario',
          component: () => import('../views/admin/Usuario.vue')
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/Login.vue'),
      meta: {
        redirectIfAuth: true
      }
    },
    {
      path: '/landing',
      name: 'landing',
      component: () => import('../pages/LandingDemo.vue')
    }
  ]
})

// Crear Guard

router.beforeEach((to, from, next) => {
  console.log("TO: ", to)

  let token = localStorage.getItem("access_token");

  if(to.meta.requireAuth){
    //capturar el token guardado en el almacenamiento local de la PC

    if (!token)
      next({name: 'login'});

      next();
  }

  if (to.meta.redirectIfAuth && token) {
    next({name: 'Admin'})
  }

  return next();

});

export default router
