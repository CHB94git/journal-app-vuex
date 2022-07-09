import { shallowMount } from '@vue/test-utils';
import HomeView from '@/views/HomeView'


describe('Pruebas componente HomeView', () => {
    it('Debe de renderizarse correctamente el componente', () => {
        const wrapper = shallowMount(HomeView)
        expect(wrapper.html()).toMatchSnapshot()
    });

    it('hacer click en un botón debe de redireccionar a no-entry', () => {
        const mockRouter = {
            push: jest.fn()
        }

        const wrapper = shallowMount(HomeView, {
            global: {
                mocks: {
                    $router: mockRouter
                }
            }
        })

        wrapper.find('button').trigger('click')
        expect(mockRouter.push).toHaveBeenCalled()
        expect(mockRouter.push).toHaveBeenCalledWith({ name: 'no-entry' })
    });
});