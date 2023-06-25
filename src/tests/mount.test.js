import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import MovieDetail from '../components/MovieDetail.vue';

describe('mount', () => {
    const wrapper = mount(MovieDetail);

    it('should be mounted', () => {
        expect(wrapper.html()).toMatchSnapshot();
    })
})