// export const setUser = (user) => {
//     return {type: 'SET_USER', payload: user}
// }

import axios from '../config/config'


export const setUser = () => {
	return async (dispatch,getState) => {
		const token = localStorage.getItem('userAuthToken') 
		
		const url = "/users/account"

		try {
			// const response = await fetch(url, {
			// 	method: 'POST',
			// 	headers: {"x-auth": token},
			// 	body: {}
			// })
			// const responseData = await response.json()

			const response = await axios({
            	method: 'post',
            	url: url,
            	data: {},
            	headers: {"x-auth": token}
        	})

		    const responseData = await response.data
		    dispatch({type: 'SET_USER',payload: responseData})

		}catch(error){
			console.log("ERROR", error)
		}
	}
}

export const resetUser = () => {
    return {type: 'RESET_USER'}
}

export const setUsers = (users) => {
    return {type: 'SET_USERS',payload: users}
}