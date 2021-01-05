export const setNotes = () => {
	return async (dispatch, getState) => {
		const token = localStorage.getItem('userAuthToken') 		
		const url = "http://localhost:6060/api/notes"

		try {
			const response = await fetch(url, {
				method: 'GET',
				data: {},
				headers: {
					'x-auth': token
				}
			})

			const responseData = await response.json()
    		dispatch({type: 'SET_NOTES',payload: responseData})
		}catch(error){
			console.log("NOTES LIST ERROR ", error)
		}
	}
}

export const addNote = (post) => {
    return {type: 'ADD_NOTE',payload: post}
}

export const removeNote = (id) => {
    return {type: 'REMOVE_NOTE',payload: id}
}
