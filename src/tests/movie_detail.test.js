import { expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import MovieDetail from '@/views/MovieDetail.vue';
import flushPromises from 'flush-promises'
import { useRoute } from 'vue-router'

vi.mock('vue-router')

describe('MovieDetail', () => {
    let movie = JSON.stringify({
        Title: 'Movie 1',
        Poster: 'poster1.jpg',
        Ratings: [
            {
                Value: '7.5/10',
            },
        ],
        Genre: 'Action',
        Released: '2022-01-01',
        Director: 'John Doe',
        Plot: 'Lorem ipsum dolor sit amet.',
    });

    it('renders movie details correctly', async () => {
        useRoute.mockReturnValue({
            params: {
                movie,
            },
        })

        const wrapper = mount(MovieDetail);

        await flushPromises()

        const movieTitle = wrapper.find('.movie-title h1');
        const moviePoster = wrapper.find('.movie-poster img');
        const movieRating = wrapper.find('.movie-information p:nth-child(1)');
        const movieGenre = wrapper.find('.movie-information p:nth-child(2)');
        const movieReleased = wrapper.find('.movie-information p:nth-child(3)');
        const movieDirector = wrapper.find('.movie-information p:nth-child(4)');
        const moviePlot = wrapper.find('.movie-plot p');

        movie = JSON.parse(movie)

        expect(movieTitle.text()).toBe(movie.Title);
        expect(moviePoster.attributes('src')).toBe(movie.Poster);
        expect(moviePoster.attributes('alt')).toBe(movie.Title);
        expect(movieRating.text()).toBe(`Puan: ${movie.Ratings[0].Value}`);
        expect(movieGenre.text()).toBe(`Tür: ${movie.Genre}`);
        expect(movieReleased.text()).toBe(`Çıkış Tarihi: ${movie.Released}`);
        expect(movieDirector.text()).toBe(`Yönetmen: ${movie.Director}`);
        expect(moviePlot.text()).toBe(movie.Plot);
    });
});
