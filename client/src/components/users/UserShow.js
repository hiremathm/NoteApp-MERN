import React from 'react'
import Axios from 'axios'
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
        Axios.get(`http://localhost:3002/users/${id}`)
            .then(response => {
                console.log("user response", response)
                this.setState({user: response.data.user, notes: response.data.notes})
            })
        
            Axios.get(`http://localhost:3002/notes`)
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