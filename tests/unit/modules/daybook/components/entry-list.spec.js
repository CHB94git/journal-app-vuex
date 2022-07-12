import { shallowMount } from '@vue/test-utils';

import EntryList from '@/modules/daybook/components/EntryList';

import { journalState } from '../../../mocks/test-journal-state';

import { createVuexStore } from '../../../helpers/create-vuex-store';


describe('Pruebas en el componente EntryList', () => {
    const store = createVuexStore(journalState)

    const mockRouter = {
        push: jest.fn()
    }

    let wrapper

    beforeEach(() => {
        jest.clearAllMocks()
        wrapper = shallowMount(EntryList, {
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [store]
            }
        })
    });


    it('debe de llamar el getEntriesByTerm sin término de búsqueda y mostrar 6 entradas', () => {

        expect(wrapper.findAll('entry-stub').length).toBe(6)
        expect(wrapper.html()).toMatchSnapshot()
    });

    it('debe de llamar el getEntriesByTerm y filtrar ', async () => {
        const input = wrapper.find('input')
        await input.setValue('Vuex')

        expect(wrapper.findAll('entry-stub').length).toBe(1)
    });

    it('el botón de nuevo debe de redireccionar a /new', () => {
        wrapper.find('button').trigger('click')
        expect(mockRouter.push).toHaveBeenCalledWith({ name: 'entry', params: { id: 'new' } })
    });
});



/* let wrapper

    const mockRouter = {
        push: jest.fn()
    }

    beforeEach(() => {
        wrapper = shallowMount(EntryList, {
            global: {
                mocks: {
                    $router: mockRouter
                }
            },
            plugins: [store]
        })
    });

    const journalMockModule = {
        namespaced: true,
        getters: {
            getEntriesByTerm
        },
        state: () => ({
            isLoading: false,
            entries: journalState.entries
        })
    }

    const store = createStore({
        modules: {
            journal: { ...journalMockModule }
        }
    }) */