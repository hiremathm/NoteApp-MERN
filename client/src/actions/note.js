import axios from '../config/config'

export const setNotes = () => {
	return async (dispatch, getState) => {
		const token = localStorage.getItem('userAuthToken') 		
		const url = "/notes"

		console.log("TOKEN IN SETNOTES", token)
		try {
			// const response = await fetch(url, {
			// 	method: 'GET',
			// 	data: {},
			// 	headers: {
			// 		'x-auth': token
			// 	}
			// })
			// const responseData = await response.json()

			const response = await axios({
            	method: 'GET',
            	url: url,
            	data: {},
            	headers: {"x-auth": token}
        	})

		    const responseData = await response.data

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
