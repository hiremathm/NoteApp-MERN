import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

class Form extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            title: "",
            body: "",
            category: "",
            user: "",
            users: [],
            categories: [],
            tags: [],
            selectedTags: []
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // const data = new FormData(e.target)
        // const formData = {}
        // this.refs.form.reset()
        // for(let entry of data.entries()){
        //     formData[entry[0]] = entry[1]
        // }
        // console.log("selected tag", this.state.selectedTags)
        // formData['tags'] = this.state.selectedTags
        const formData = {
            title: this.state.title,
            body: this.state.body,
            category: this.state.category,
            user: this.state.user,
            tags: this.state.selectedTags.map(tag =>{ 
                console.log("tag is", tag)
                return {tag: tag._id, name: tag.name}}
                )
        }
        console.log('formdata', formData)
        this.props.handleSubmit(formData)
    }

    handleChange = (e) => {
        e.persist()
        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }

    handleTagSelection = (e) => {

        const id = e.target.value.split('|')[0]
        const name = e.target.value.split[1]
        console.log('sleecjlsdfklsdf tag is ', id, e.target.checked)
        if(e.target.checked){
            const tagItem = {_id: id, name: name}
            this.setState(prevState => ({
                selectedTags: [...prevState.selectedTags,tagItem]
            }))
        
        }else {
            this.setState(prevState => ({
                selectedTags: prevState.selectedTags.filter(t => t._id !== id)
            }))
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

        axios.get('http://localhost:3002/users')
            .then(response => {
                this.setState({users: response.data})
            })
            .catch(error => {
                console.log(error)
            })

        axios.get('http://localhost:3002/tags')
            .then(response => {
                this.setState({tags: response.data})
            })
            .catch(error => {
                console.log(error)
            })
    }
    
    componentWillReceiveProps = (nextProps) => {
        console.log("nextprops",nextProps)
        if(nextProps.note !== undefined){
            this.setState(() => ({
                    title: nextProps.note.title,
                    body: nextProps.note.body,
                    category: nextProps.note.category,
                    user: nextProps.note.user,
                    selectedTags: nextProps.note.tags.map(tag =>{
                        return {_id: tag.tag._id, name: tag.tag.name}
                    }
                    )
                })
            )
        }
        console.log("hello shiva", this.state.selectedTags) 

        axios.get('http://localhost:3002/tags')
        .then(response => {
            this.setState({tags: response.data.map(tag =>{return {_id: tag._id, name: tag.name}})})
        })
        .catch(error => {
            console.log(error)
        })
    }
    render(){
        console.log('selected tags inside render ', this.state.selectedTags)
        console.log('tags inside render ', this.state.tags)
        return(
            <div>
                <form onSubmit={this.handleSubmit} ref="form">
                    <label>
                        Category : <select name="category" onChange={this.handleChange}>
                            <option value="">Select Category</option>
                            {this.state.categories.map(category => {
                            return <option key={category._id} value={category._id} selected={this.state.category._id === category._id}>{category.title}</option>
                            })}                   
                        </select>
                    </label>
                    <br/><br/>
                    <label>
                        Title : <input type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
                    </label>
                    <br/><br/>
                    <label>
                        Body : <input type="text" name="body" value={this.state.body } onChange={this.handleChange}/>
                    </label>
                    <br/><br/>

                    <label>
                        User : <select name="user" onChange={this.handleChange}>
                            <option value="">Select User</option>
                            {this.state.users.map(user => {
                            return <option key={user._id} value={user._id} selected={this.state.user._id === user._id}>{user.name}</option>
                            })}                   
                        </select>
                    </label><br/><br/>

                    <label>
                        Tags : 
                            {this.state.tags && this.state.tags.map(tag => {
                                return <label key = {tag._id}><input type="checkbox" value={`${tag._id}|${tag.name}`} onChange = {this.handleTagSelection
                            } checked={this.state.selectedTags.findIndex(v => v._id === tag._id) >= 0 ? tag._id : ''}/>{tag.name}</label> 
                            })}
                    </label><br/><br/>
                    <label>
                        <input type="Submit" value={this.props.submitvalue ? this.props.submitvalue : "Create Note"} readOnly/>
                        <Link to="/notes"><button>Back</button></Link>
                    </label>
                </form>

            </div>
        )
    }
}

export default Form