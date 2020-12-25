import React from 'react'
import axios from '../../config/config'
// import axios from 'axios'

import {addNote} from '../../actions/note'
import {connect} from 'react-redux'
import Form from './Form'


class NewNote extends React.Component {
    handleSubmit = (formData) => {
        let token = localStorage.getItem('userAuthToken')
        console.log("TOKEN IN POST CREATION", token)
        let url = "/notes"
        axios({
            method: 'post',
            url: url,
            data: formData,
            headers: {"x-auth": token}
        })
        .then(response => {
            console.log("response", response)
            this.props.dispatch(addNote(response.data))
            this.props.history.push(`/notes`)
        })
        .catch(error => {
            console.log("error", error)
        })
    }

    render(){
        return(
            <div>
                <h3>New Note</h3>

                <Form handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default connect()(NewNote)