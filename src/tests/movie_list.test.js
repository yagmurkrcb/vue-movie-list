import { expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import MovieList from '@/views/MovieList.vue';
import flushPromises from 'flush-promises'
import movieService from '@/services/movieService'
import { createRouter, createWebHistory } from 'vue-router';

describe('MovieList', () => {
    let movies = [];

    beforeEach(() => {
        vi.mock('@/services/movieService', () => {
            return {
                default: { getMovies: vi.fn(), }
            };
        });

        movies = [
            {
                Title: 'Movie 1',
                Poster: 'poster1.jpg',
            },
            {
                Title: 'Movie 2',
                Poster: 'poster2.jpg',
            },
            {
                Title: 'Movie 3',
                Poster: 'poster3.jpg',
            },
        ];

        movieService.getMovies.mockResolvedValue({
            data: movies,
        })
    });

    afterEach(() => {
        vi.clearAllMocks()
    })

    it('fetches movies on component mount', async () => {
        const wrapper = mount(MovieList);

        await flushPromises()

        expect(movieService.getMovies).toHaveBeenCalled();
        expect(wrapper.vm.movies).toEqual(movies);
    });

    it('renders movie cards with correct data', async () => {
        const wrapper = mount(MovieList);

        await flushPromises()

        const movieCards = wrapper.findAll('.movie-card');

        expect(movieCards).toHaveLength(movies.length);

        movies.forEach((movie, index) => {
            const movieCard = movieCards[index];
            const movieTitle = movieCard.find('.movie-title');
            const moviePoster = movieCard.find('.movie-poster img');
            const movieDetailRouter = movieCard.find('router-link');

            expect(movieTitle.text()).toBe(movie.Title);
            expect(moviePoster.attributes('src')).toBe(movie.Poster);
            expect(moviePoster.attributes('alt')).toBe(movie.Title);
            expect(movieDetailRouter.attributes('id')).toBe("router_" + index);
        });
    });

    it('clicks to router-link', async () => {
        const router = createRouter({
            history: createWebHistory(),
            routes: [
                {
                    name: 'MovieDetail',
                    path: '/movie/:id',
                },
            ],
        });

        const wrapper = mount(MovieList, {
            global: {
                plugins: [router],
            },
        });

        await flushPromises()

        const routerLink = wrapper.find('a');

        await routerLink.trigger('click');

        await flushPromises()

        expect(router.currentRoute.value.name).toBe('MovieDetail');
    });
});
