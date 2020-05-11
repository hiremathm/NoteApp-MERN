import React from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'

class UserList extends React.Component {
    constructor(){
        super()
        this.state = {
            users: []
        }
    }

    componentDidMount = () => {
        axios.get('http://localhost:3002/users')
            .then(response => {
                this.setState({users: response.data})
            })
            .catch(error => {
                console.log("users errors", error)
            })
    }        

    render(){
        return (
            <div>
                <h2>User List : {this.state.users.length}</h2>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>    
                    </thead>
                    <tbody>
                        {this.state.users.map(user => {
                        return <tr key={user._id}><td><Link to={`/users/${user._id}`}>{user.name}</Link></td><td>{user.email}</td><td>{user.mobile}</td></tr>
                        })}
                    </tbody>    
                </table>    
            </div>            
        )
    }
}
export default UserList;