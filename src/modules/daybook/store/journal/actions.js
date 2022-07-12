import journalApi from '@/api/journalAPI'


export const loadEntries = async ({ commit }) => {

    const { data } = await journalApi('/entries.json')

    if (!data) {
        commit('setEntries', [])
        return
    }
    const entries = []

    for (let id of Object.keys(data)) {
        entries.push({
            id,
            ...data[id]
        })
    }

    commit('setEntries', entries)
}

export const updateEntry = async ({ commit }, entry) => {
    const { text, picture, date } = entry
    const dataToSave = { text, picture, date }

    await journalApi.put(`/entries/${entry.id}.json`, dataToSave)

    dataToSave.id = entry.id

    commit('updateEntry', { ...dataToSave })
}

export const createEntry = async ({ commit }, entry) => {
    const { text, picture, date } = entry
    const dataToSave = { text, picture, date }

    const { data } = await journalApi.post('/entries.json', dataToSave)

    dataToSave.id = data.name

    commit('addEntry', dataToSave)

    return data.name
}


export const deleteEntry = async ({ commit }, id) => {
    await journalApi.delete(`/entries/${id}.json`)
    commit('removeEntry', id)
    return id
}