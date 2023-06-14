import axios from 'axios'

const API_BASE_URL = 'https://fake-movie-api.onrender.com/api/movies'
const AUTH_KEY = 'RmFrZU1vdmllQVBJLWM5MzU1ZjE0LTM3ZGUtNDAzNC1hMTAzLTRkOTcxOTYwOWRmNg=='

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'AuthKey': AUTH_KEY
    }
})

export default {
    getMovies() {
        return axiosInstance.get('/')
    },
    getMovieById(id) {
        return axiosInstance.get(`/${id}`)
    }
}