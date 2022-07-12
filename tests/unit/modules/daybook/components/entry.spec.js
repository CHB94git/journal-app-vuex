import { shallowMount } from '@vue/test-utils';
import Entry from '@/modules/daybook/components/Entry';
import { journalState } from '../../../mocks/test-journal-state';

describe('Pruebas componente entry', () => {
    let wrapper

    const mockRouter = {
        push: jest.fn()
    }

    beforeEach(() => {
        wrapper = shallowMount(Entry, {
            props: {
                entry: journalState.entries[0]
            },
            global: {
                mocks: {
                    $router: mockRouter
                }
            }
        })
    });


    it('debe de hacer match con el snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    });


    it('debe de redireccionar al hacer clic en el entry-container', () => {
        const entryContainer = wrapper.find('.entry-container')

        entryContainer.trigger('click')

        expect(mockRouter.push).toHaveBeenCalled()

        expect(mockRouter.push).toHaveBeenCalledWith(
            {
                name: 'entry',
                params: {
                    // '-N6Qv2Q_OCTqBCWgCnME'
                    id: journalState.entries[0].id
                }
            }
        )
    });


    it('pruebas en las propiedades computadas', () => {
        expect(wrapper.vm.day).toBe(7);
        expect(wrapper.vm.month).toBe('Julio');
        expect(wrapper.vm.yearDay).toBe('2022, Jueves');
    });
});