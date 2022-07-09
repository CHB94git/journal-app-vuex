import { shallowMount } from '@vue/test-utils';
import AboutView from '@/views/AboutView'

describe('Pruebas en el About View', () => {
    it('debe de renderizar el componente correctamente y hacer match con el snapshot', () => {
        const wrapper = shallowMount(AboutView)
        expect(wrapper.html()).toMatchSnapshot()
    });
});