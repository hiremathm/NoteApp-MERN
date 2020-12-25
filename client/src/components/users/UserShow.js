import React from 'react'
// import axios from '../../config/config'
import axios from 'axios'
class UserShow extends React.Component {
    constructor(){
        super()
        this.state = {
            user: {},
            notes: []
        }
    }

    componentDidMount = () => {
        const id = this.props.match.params.id
        axios.get(`/users/${id}`,{"headers": {"x-auth": localStorage.getItem('userAuthToken')}})
            .then(response => {
                console.log("user response", response)
                this.setState({user: response.data.user, notes: response.data.notes})
            })
        
            axios.get(`/notes`,{"headers": {"x-auth": localStorage.getItem('userAuthToken')}})
            .then(response => {
                this.setState({
                    notes: response.data
                })
            })
    } 

    render(){
        return(
            <div>
                <h3>User : {this.state.user.name}</h3>
                
                <h4>List of posts</h4>

                {"=".repeat(150)}
                <ul>
                {this.state.notes.map(note => {
                return <li key={note._id}><h4>{note.title}</h4><p>{note.body}</p></li>
                })}
                </ul>
            </div>
        )
    }
}

export default UserShow