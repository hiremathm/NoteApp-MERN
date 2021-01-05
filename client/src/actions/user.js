// export const setUser = (user) => {
//     return {type: 'SET_USER', payload: user}
// }

export const setUser = () => {
	return async (dispatch,getState) => {
		const token = localStorage.getItem('userAuthToken') 
		
		const url = "http://localhost:6060/api/users/account"

		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {"x-auth": token},
				body: {}
			})
			const responseData = await response.json()
		    
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