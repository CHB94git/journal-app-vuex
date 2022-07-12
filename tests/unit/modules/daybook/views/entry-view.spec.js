import { shallowMount } from '@vue/test-utils';
import Swal from 'sweetalert2';

import EntryView from '@/modules/daybook/views/EntryView';

import { journalState } from '../../../mocks/test-journal-state';

import { createVuexStore } from '../../../helpers/create-vuex-store';

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn()
}))

describe('Pruebas en el EntryView', () => {
    const store = createVuexStore(journalState)
    store.dispatch = jest.fn()

    const mockRouter = {
        push: jest.fn()
    }

    let wrapper

    beforeEach(() => {
        jest.clearAllMocks()
        wrapper = shallowMount(EntryView, {
            props: {
                // -N6QvGQ066Y9unFv3buo
                id: journalState.entries[1].id
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [store]
            }
        })
    });


    it('debe de sacar el usuario de la vista al no tener el id', () => {

        const wrapper = shallowMount(EntryView, {
            props: {
                id: '15155150215'
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [store]
            }
        })

        expect(mockRouter.push).toHaveBeenCalledWith({
            name: 'no-entry'
        })
    });

    it('debe de mostrar la entrada correctamente', () => {
        expect(wrapper.html()).toMatchSnapshot()
        expect(mockRouter.push).not.toHaveBeenCalled();
    });


    it('debe de borrar la entrada y salir', async () => {
        
        Swal.fire.mockReturnValueOnce(Promise.resolve({ isConfirmed: true }))

        await wrapper.find('.btn-danger').trigger('click')

        expect(Swal.fire).toHaveBeenCalledWith({
            title: '¿Estás seguro/a de eliminar?',
            text: 'Una vez se borre el elemento no se puede deshacer la acción',
            showDenyButton: true,
            denyButtonText: 'No, aún no',
            icon: 'question',
            confirmButtonText: 'Sí, eliminar'
        })

        expect(store.dispatch).toHaveBeenCalledWith('journal/deleteEntry', '-N6QvGQ066Y9unFv3buo')
        expect(mockRouter.push).toHaveBeenCalled()
    });

})