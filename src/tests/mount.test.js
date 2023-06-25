import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import MovieList from '../views/MovieList.vue';

describe('mount', () => {
    const wrapper = mount(MovieList);

    it('should be mounted', () => {
        expect(wrapper.html()).toMatchSnapshot();
    })
})