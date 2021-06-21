import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ChangePassword from '../views/ChangePassword.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import NotFound from '../views/NotFound.vue'
import CreateSubreddit from '../views/CreateSubreddit.vue'
import Subreddits from '../views/Subreddits.vue'
import R from '../views/R.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/changePassword',
    name: 'ChangePassword',
    component: ChangePassword
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/createSubreddit',
    name: 'CreateSubreddit',
    component: CreateSubreddit
  },
  {
    path: '/Subreddits',
    name: 'Subreddits',
    component: Subreddits
  },
  {
    path: '/r/:name',
    name: 'R',
    component: R
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
