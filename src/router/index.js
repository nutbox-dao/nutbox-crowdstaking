import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Kusama from '../views/kusama/Kusama'
import Polkadot from '../views/polkadot/Polkadot'
import Contributions from '../views/contributions/Contributions'
import Dashboard from '../views/dashboard/Dashboard'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: Home,
    component: Home
  },
  {
    path: '/kusama',
    name: 'Kusama',
    component: Kusama
  },
  {
    path: '/polkadot',
    name: 'Polkadot',
    component: Polkadot
  },
  {
    path: '/contributions',
    name: 'Contributions',
    component: Contributions
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  }
]

const router = new VueRouter({
  routes
})

export default router
