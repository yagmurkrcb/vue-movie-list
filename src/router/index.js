
import { createRouter, createWebHistory } from 'vue-router'
import MovieList from '../views/MovieList.vue'
import MovieDetail from '../views/MovieDetail.vue'

const routes = [
  {
    path: '/',
    name: 'MovieList',
    component: MovieList
  },
  {
    path: '/movie/:id/:movie',
    name: 'MovieDetail',
    component: MovieDetail,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router