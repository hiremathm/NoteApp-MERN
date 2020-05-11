import React from 'react'
import Axios from 'axios'
import {addNote} from '../../actions/note'
import {connect} from 'react-redux'
import Form from './Form'


class NewNote extends React.Component {
    handleSubmit = (formData) => {
        let url = "http://localhost:3002/notes"
        Axios({
            method: 'post',
            url: url,
            data: formData,
            headers: {"x-auth": localStorage.getItem('userAuthToken')}
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