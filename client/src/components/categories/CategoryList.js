import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class CategoryList extends React.Component {
    constructor(){
        super()
        this.state = {
            categories: []
        }
    }

    componentDidMount = () => {
        axios.get('http://localhost:3002/categories')
            .then(response => {
                this.setState({categories: response.data})
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        return(
            <div>
                <h3>Categories List : {this.state.categories.length}</h3>
                <ul>
                    {this.state.categories.map(category => {
                    return <li key={category._id}><Link to={`/categories/${category._id}`}>{category.title}</Link>{" ".repeat(1)}<Link to={`/categories/edit/${category._id}`}>Edit </Link></li>
                    })}
                </ul>
                <h3><Link to="/categories/new">New Category</Link></h3>
            </div>
        )
    }
}

export default CategoryList