

/* export const myMutation = (state) => {
    return state
} */

export const setEntries = (state, entries) => {
    state.entries = [...state.entries, ...entries]
    state.isLoading = false
}

export const updateEntry = (state, entryUpdated) => {

    const idx = state.entries.map(entry => entry.id).indexOf(entryUpdated.id)
    state.entries[idx] = entryUpdated
}

export const addEntry = (state, newEntry) => {
    state.entries = [newEntry, ...state.entries]
}

export const removeEntry = (state, id) => {
    state.entries = state.entries.filter(e => e.id !== id)
}