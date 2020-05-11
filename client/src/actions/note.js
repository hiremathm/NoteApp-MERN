export const setNotes = (posts) => {
    return {type: 'SET_NOTES',payload: posts}
}

export const addNote = (post) => {
    return {type: 'ADD_NOTE',payload: post}
}

export const removeNote = (id) => {
    return {type: 'REMOVE_NOTE',payload: id}
}
