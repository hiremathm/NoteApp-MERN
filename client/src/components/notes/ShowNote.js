import React from 'react'
// import axios from '../../config/config'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {removeNote} from '../../actions/note'
import { Button } from 'reactstrap';

class ShowNote extends React.Component {
    // constructor(props){
    //     super(props)
    //     this.state = {
    //         note: {}        
    //     }
    // }

    // componentDidMount = () => {
    //     const id = this.props.match.params.id
    //     console.log("id is ", id)
    //     axios.get(`/notes/${id}`,{"headers":{"x-auth": localStorage.getItem('userAuthToken')}})
    //         .then(response => {
    //             console.log("response", response)
    //             this.setState({note: response.data})
    //         })
    //         .catch(error => {
    //             console.log("error", error)
    //         })
    // }

    handleRemove = () => {
        const id = this.props.match.params.id
        axios.delete(`/notes/${id}`,{"headers":{"x-auth": localStorage.getItem('userAuthToken')}})
            .then(response => {
                this.props.dispatch(removeNote(response.data.id))
                this.props.history.push(`/notes`)
                // this.setState({note: response.data})
            })
            .catch(error => {
                console.log("error", error)
            })   
    }

    removeTag = (tagId) => {
        console.log('removed tag ', tagId)
        const noteId = this.props.note._id
        axios.delete(`/notes/removeTag?noteId=${noteId}&tagId=${tagId}`,{"headers":{"x-auth": localStorage.getItem('userAuthToken')}})
            .then(response => {
                // if(response.data.hasOwnProperty('errors')){
                    this.setState({note: response.data})
                    console.log('removed tag is : ', response.data)
                // }
                // else{
                    // alert('Unable to delete tag, Please wait.')
                // }
            })
    }
    render(){
        return(
            <div>
                {this.props.note && 
                <div>
                    <h3>Title : {this.props.note.title}</h3>
                    <h5>Body : {this.props.note.body}</h5>
                    <h5>Category : {this.props.note.category && this.props.note.category.title}</h5>
                    <h5>User : {this.props.note.user && this.props.note.user.name}</h5>
                    <h5>Tags : {this.props.note.tags && (
                        <ul>
                            {this.props.note.tags.map(tag => {
                                console.log('sleected tag is ', tag)
                            return <li key={tag.tag._id}>{tag.tag.name} <Button className='btn btn-sm btn-danger' onClick={() => {this.removeTag(tag._id)}}>X</Button></li>
                            })}
                        </ul>
                    )}</h5>
                    <Button onClick = {this.handleRemove} className='btn btn-sm btn-danger' >Remove</Button>
                    <Link to={`/notes/edit/${this.props.match.params.id}`}> <Button className='btn btn-sm btn-success'>Edit</Button></Link>
                    <Link to="/notes"> <Button className='btn btn-sm btn-primary'>Back</Button></Link>
                </div>
    }
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        note: state.notes.find(note => note._id === props.match.params.id)
    }
}

export default connect(mapStateToProps)(ShowNote);