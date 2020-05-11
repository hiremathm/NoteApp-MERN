import React  from "react";
import axios from '../../config/config'

import Form from './Form'

class CategoryNew extends React.Component {
    handleSubmit = (formData) => {
        let url = "/categories"
        axios({
                method: 'post',
                url: url, 
                data: formData
            })
            .then(response => {
                console.log(response)
                this.props.history.push(`/categories/${response.data._id}`)
            })
    }

    render(){
        return(
            <div>
                <h2>New Categroy</h2>
                <Form handleSubmit = {this.handleSubmit}/>    
            </div>

        )
    }
}

export default CategoryNew;