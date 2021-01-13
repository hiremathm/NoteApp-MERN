import React,{useEffect,useContext} from 'react'
import axios from '../../config/config'
// import axios from 'axios'

import {connect} from 'react-redux'
import {resetUser} from '../../actions/user'

import { AuthContext } from '../../context/AuthContext'

import LoadingSpinner from '../ui/LoadingSpinner'

const Logout = (props) => {
    const auth = useContext(AuthContext)

    useEffect(() => {
        const token = localStorage.getItem("userAuthToken")
        const url = "/users/logout"
        if(token){
            axios({
                method: 'delete',
                url: url,
                data: {},
                headers: {"x-auth": localStorage.getItem('userAuthToken')}
            })
            .then(response => {
                console.log("logout response", response.data)
                localStorage.removeItem("userAuthToken")
                props.dispatch(resetUser())
                auth.logout()
            })
            .catch(error => {
                console.log("error", error)
            })
        }
    },[auth,props])
    return <LoadingSpinner asOverlay/>
}

export default connect()(Logout);