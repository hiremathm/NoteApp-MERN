import React,{useState} from 'react'
import axios from '../../config/config'
// import axios from 'axios'

import {setNotes} from '../../actions/note'
import {connect} from 'react-redux'
import Form from './Form'

import LoadingSpinner from '../ui/LoadingSpinner'

import {useDispatch} from 'react-redux'


const NewNote = (props) => {
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false)
    const handleSubmit = (formData) => {
        let token = localStorage.getItem('userAuthToken')
        let url = "/notes"
        axios({
            method: 'post',
            url: url,
            data: formData,
            headers: {"x-auth": token}
        })
        .then(response => {
            dispatch(setNotes())
            props.history.push(`/notes`)
        })
        .catch(error => {
            console.log("error", error)
        })
    }

    return(
        <div>
            <h3>New Note</h3>

            <Form handleSubmit={handleSubmit} />
        </div>
    )

}

export default NewNote