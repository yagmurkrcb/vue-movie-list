<template>
  <div v-if="movie" class="container">
    <div class="movie-detail">
      <div class="movie-title">
        <h1>{{ movie.Title }}</h1>
      </div>
      <div class="movie-content">
        <div class="movie-poster">
          <img :src="movie.Poster" :alt="movie.Title" />
        </div>
        <div class="movie-information">
          <p><strong>Puan:</strong> {{ movie.Ratings[0].Value }}</p>
          <p><strong>Tür:</strong> {{ movie.Genre }}</p>
          <p><strong>Çıkış Tarihi:</strong> {{ movie.Released }}</p>
          <p><strong>Yönetmen:</strong> {{ movie.Director }}</p>
        </div>
      </div>
      <div class="movie-plot">
        <h2>Açıklama</h2>
        <p>{{ movie.Plot }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';

export default {
  name: 'MovieDetail',
  setup() {
    const movie = ref()

    const route = useRoute();

    onMounted(() => {
      movie.value = JSON.parse(route.params.movie)
      console.log(movie.value)
    })

    return { movie }
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.movie-detail {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.movie-title h1 {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.movie-content {
  display: flex;
  align-items: flex-start;
}

.movie-poster img {
  max-width: 100%;
  height: auto;
}

.movie-information {
  margin-left: 20px;
}

.movie-plot h2 {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.movie-plot p {
  font-size: 16px;
  color: #666;
  line-height: 1.5;
}
</style>