import React from 'react'
import axios from '../../config/config'
// import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

// import {setUsers} from '../../actions/user'

class UserList extends React.Component {
    constructor(){
        super()
        this.state = {
            users: []
        }
    }

    componentDidMount = () => {
        axios.get('/users',{"headers": {"x-auth": localStorage.getItem('userAuthToken')}})
            .then(response => {
                console.log("user list ", response.data)
                // this.props.dispatch(setUsers(response.data))
                this.setState({users: response.data})
            })
            .catch(error => {
                console.log("users errors", error)
            })
    }        

    render(){
        console.log('user list in render ')
        return (
            <div>
                <h2>User List : {this.state.users && this.state.users.length}</h2>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>    
                    </thead>
                    <tbody>
                        {this.state.users && this.state.users.map(user => {
                        return <tr key={user._id}><td><Link to={`/users/${user._id}`}>{user.name}</Link></td><td>{user.email}</td><td>{user.mobile}</td></tr>
                        })}
                    </tbody>    
                </table>    
            </div>            
        )
    }
}

// const mapStateToProps = (state) => {
//     // console.log("users list in map state ", state)
//     return {users: state.users}
// }

export default connect()(UserList);