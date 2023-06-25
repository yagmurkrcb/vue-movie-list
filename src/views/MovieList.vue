<template>
  <div class="container">
    <h1>Movie List</h1>
    <div class="movie-cards">
      <div v-for="(movie, index) in movies" :key="index" class="movie-card">
        <router-link :id="'router_' + index"
          :to="{ name: 'MovieDetail', params: { id: index, movie: JSON.stringify(movie) } }" tag="li">
          <div class="movie-poster">
            <img :src="movie.Poster" :alt="movie.Title" />
          </div>
          <div class="movie-information">
            <p class="movie-title">{{ movie.Title }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import movieService from '../services/movieService'

export default {
  name: 'MovieList',
  setup() {
    const movies = ref([])

    onMounted(() => {
      movieService.getMovies()
        .then(response => {
          movies.value = response.data
        })
        .catch(error => {
          console.error(error)
        })
    })

    return { movies }
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.movie-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
}

.movie-card {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.movie-card:hover {
  background-color: #f2f2f2;
}

.movie-poster img {
  max-width: 100%;
  height: auto;
}

.movie-information {
  padding: 10px;
}

.movie-title {
  font-size: 16px;
  color: #333;
  margin: 0;
}
</style>