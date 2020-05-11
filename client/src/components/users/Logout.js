import React from 'react'
import Axios from 'axios'

import {connect} from 'react-redux'
import {resetUser} from '../../actions/user'

class Logout extends React.Component {
    componentDidMount = () => {
        const token = localStorage.getItem("userAuthToken")
        const url = "http://localhost:3002/users/logout"
        if(token){
            Axios({
                method: 'delete',
                url: url,
                data: {},
                headers: {"x-auth": localStorage.getItem('userAuthToken')}
            })
            .then(response => {
                console.log("response", response.data)
                localStorage.removeItem("userAuthToken")
                this.props.dispatch(resetUser())
                // this.props.handleIsAuthenticated(false)
                this.props.history.push('/login')
            })
            .catch(error => {
                console.log("error", error)
            })
        }
    }

    render(){
        return(
            <div>
            </div>
        )
    }
}

export default connect()(Logout);