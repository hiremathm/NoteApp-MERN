import React from 'react'
import axios from 'axios'
import Form from './Form'

class EditNote extends React.Component {
    constructor(){
        super()
        this.state = {
            note: {}
        }
    }

    componentDidMount = () => {
        const id = this.props.match.params.id
        axios.get(`http://localhost:3002/notes/${id}`,{"headers":{"x-auth": localStorage.getItem('userAuthToken')}})
            .then(response => {
                this.setState({note: response.data})
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleSubmit = (formData) =>{
        const id = this.props.match.params.id
        axios.put(`http://localhost:3002/notes/${id}`, formData,{"headers":{"x-auth": localStorage.getItem('userAuthToken')}})
            .then(() => {
                this.props.history.push(`/notes`)
                // this.setState({note: response.data})
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        return(
            <div>
                <h3>Edit Note</h3>
                <Form note={this.state.note} submitvalue="Update Note" handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}

export default EditNote;