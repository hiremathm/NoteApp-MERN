import React from 'react'
import axios from 'axios'

class CategoryShow extends React.Component {

    constructor(){
        super()
        this.state = {
            category: {},
            notes: []
        }
    }

    componentDidMount = () => {
        const id = this.props.match.params.id 
        axios.get(`http://localhost:3002/categories/${id}`)
            .then(response => {
                console.log(response)
                this.setState({category: response.data.category, notes: response.data.notes})
            })
    }

    render(){
        return(
        <div>
            <h2>Category : {this.state.category && this.state.category.title}</h2>
        <h3>List of Notes : {this.state.notes.length}</h3>
            {"=".repeat(150)}
            {this.state.notes.map(note => {
                return <p>
                    <h4>{note.title}</h4>
                    <h6>{note.body}</h6>
                    {"=".repeat(150)}
                </p>
            })}
        </div>
        )
    }
}

export default CategoryShow;