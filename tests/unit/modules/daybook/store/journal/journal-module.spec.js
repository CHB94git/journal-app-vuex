import { journalState } from '../../../../mocks/test-journal-state';
import { createVuexStore } from './helpers/create-vuex-store';


describe('Vuex - Pruebas en el modulo Journal', () => {

    // ================ Básicas ================
    it('este debe ser el estado inicial del store', () => {
        const store = createVuexStore(journalState)
        const { isLoading, entries } = store.state.journal

        expect(isLoading).toBeFalsy()
        expect(entries).toEqual(journalState.entries)
    });


    // === Mutations ===
    it('mutation: setEntries', () => {
        const store = createVuexStore({
            isLoading: true,
            entries: []
        })

        store.commit('journal/setEntries', journalState.entries)

        expect(store.state.journal.entries.length).toBe(6)
        expect(store.state.journal.isLoading).toBeFalsy()
    });

    it('mutation: updateEntry', () => {
        const store = createVuexStore(journalState)

        const updatedEntry = {
            id: "ABC123",
            date: "Wed Jul 20 2022",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quaaerat, praesentium ad similique laborios, consectetur adipisicing elit. Beatae quaaerat EDITADO DESDE JEST"
        }

        store.commit('journal/updateEntry', updatedEntry)

        const pathStore = store.state.journal.entries

        expect(pathStore.length).toBe(6)
        expect(pathStore.find(e => e.id === updatedEntry.id)).toEqual(updatedEntry)

    });

    it('mutations: addEntry y removeEntry', () => {
        const store = createVuexStore(journalState)

        const addEntry = {
            id: "ABC-123",
            date: "Sun Jul 10 2022",
            text: "Hola mundo DESDE JEST - add entry"
        }

        store.commit('journal/addEntry', addEntry)

        const pathStoreAdd = store.state.journal.entries

        expect(pathStoreAdd.length).toBe(7)
        expect(pathStoreAdd.find(e => e.id === addEntry.id)).toBeTruthy()

        store.commit('journal/removeEntry', addEntry.id)

        const pathStoreDel = store.state.journal.entries

        expect(pathStoreDel.length).toBe(6)
        expect(pathStoreDel.find(e => e.id === addEntry.id)).toBeFalsy()

    });


    // === Getters ===
    test('getters: getEntriesByTerm getEntryById', () => {

        const store = createVuexStore(journalState)

        const [e1, e2, e3, e4, e5, e6] = journalState.entries

        expect(store.getters['journal/getEntriesByTerm']('').length).toBe(6)

        expect(store.getters['journal/getEntriesByTerm']('Vuex').length).toBe(1)
        expect(store.getters['journal/getEntriesByTerm']('Vuex')).toEqual([e2])
        expect(store.getters['journal/getEntriesByTerm']('Vuex')).toContainEqual(e2)

        // -N6Qv2Q_OCTqBCWgCnME (id de e1)
        expect(store.getters['journal/getEntryById'](e1.id)).toEqual(e1)
        expect(store.getters['journal/getEntryById'](e1.id)).toStrictEqual(e1)
    });


    // === Actions ===
    it('Actions: loadEntries', async () => {
        const store = createVuexStore({ isLoading: true, entries: [] })

        await store.dispatch('journal/loadEntries')
        expect(store.state.journal.entries.length).toBe(6)
    });

    it('Actions: updateEntry', async () => {
        const store = createVuexStore(journalState)

        const updatedEntry = {
            id: "ABC123",
            date: "Sun Jul 10 2022",
            text: "EDICIÓN DESDE JEST HACIA FIREBASE",
            otroCampo: true,
            unoMas: {
                prueba: 100
            }
        }

        await store.dispatch('journal/updateEntry', updatedEntry)

        const entries = store.state.journal.entries
        expect(entries.length).toBe(6)

        const { id, date, text } = updatedEntry
        expect(entries.find(e => e.id === updatedEntry.id)).toEqual({
            id,
            date,
            text
        })
    });

    it('Actions: createEntry - deleteEntry', async () => {
        const store = createVuexStore(journalState)

        const newEntry = {
            date: 'Mon Jul 11 2022',
            text: 'New entry from jest testing'
        }

        const id = await store.dispatch('journal/createEntry', newEntry)

        expect(typeof id).toBe('string')

        expect(store.state.journal.entries.find(e => e.id === id)).toBeTruthy()

        await store.dispatch('journal/deleteEntry', id)

        expect(store.state.journal.entries.find(e => e.id === id)).toBeFalsy()

    });
});