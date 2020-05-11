import React from 'react'
import axios from 'axios'

import Form from './Form'

class CategoryEdit extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            category: {}
        }
    }

    handleSubmit = (formData) => {
        const id = this.props.match.params.id
        let url = `http://localhost:3002/categories/${id}`
        axios({
                method: 'put',
                url: url, 
                data: formData
            })
            .then(response => {
                console.log(response)
                this.props.history.push(`/categories/${response.data._id}`)
            })
    }

    componentDidMount = () => {
        const id = this.props.match.params.id
        axios.get(`http://localhost:3002/categories/${id}`)
            .then(response => {
                this.setState({
                    category: response.data.category
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        return(
            <div>
                <h3>Edit Category</h3>
                <Form handleSubmit = {this.handleSubmit} category = {this.state.category} submitValue = "Update Category"/>
            </div>

        )
    }
}

export default CategoryEdit;