import { shallowMount } from "@vue/test-utils";
import Fab from '@/modules/daybook/components/Fab'


describe('Pruebas en el FAB component', () => {
    it('debe de mostrar el ícono por defecto', () => {
        const wrapper = shallowMount(Fab)
        const iTag = wrapper.find('i')
        expect(iTag.classes('fa-plus')).toBeTruthy()
    });

    it('debe de mostrar el ícono por argumento(props): fa-circle', () => {
        const wrapper = shallowMount(Fab, {
            props: {
                icon: 'fa-circle'
            }
        })
        const iTag = wrapper.find('i')
        expect(iTag.classes('fa-circle')).toBeTruthy()
    });

    it('debe de emitir el evento "on:click" cuando se hace click en el ícono', () => {
        const wrapper = shallowMount(Fab)
        wrapper.find('button').trigger('click')
        expect(wrapper.emitted('on:click')).toHaveLength(1)
    });
});