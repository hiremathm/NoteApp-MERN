import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Card, CardBody, Button, CardTitle, CardText} from 'reactstrap'

import {connect} from 'react-redux'
import {setNotes} from '../../actions/note'


class NoteList extends React.Component {
    constructor(){
        super()
        this.state = {
            // notes: [],
            colors: ['secondary','primary','success','info','warning']
        }
    }

    componentDidMount = () => {
        axios.get('http://localhost:3002/notes',{"headers": {"x-auth": localStorage.getItem('userAuthToken')}})
            .then(response => {
                // this.setState({notes: response.data})
                this.props.dispatch(setNotes(response.data))
            })
            .catch(error => {
                console.log("error", error)
                // this.setState({notes: []})
            })
    }

    render(){
        return(
            <div >
                <div className="row">
                    <div className="col-sm-9">
                        <Button outline className="NewNote" color="primary" href="/notes/new">New Note</Button>
                    </div>
                    <div className="col-sm-3 username">
                        Total Notes : {this.props.notes.length} by <b><small>{this.props.user.name}</small></b>
                    </div>
                </div>
                <br/>
                <div className="row">
                    {/* {this.state.notes.map(note => { */}
                    {this.props.notes.map(note => {
                        return(
                            <div key = {note._id} className="col-sm-4">
                                    <Card body outline color={this.state.colors[Math.floor(Math.random() * 5)]}>
                                        <CardBody>
                                            <CardTitle>
                                                {/* <Link to={`/notes/${note._id}`} >{note.title.toUpperCase()}</Link> */}
                                                {note.title.toUpperCase()}
                                            </CardTitle>
                                            <CardText>
                                                {note.body.slice(0,100)}
                                            </CardText>
                                            <CardText>
                                                <small className="text-muted">Tags : </small> 
                                                {note.tags && note.tags.map(tag => {
                                                    return <small key={tag._id} className="text-muted"><Link key={tag._id} to={`/tags/${tag._id}`}>{tag.tag.name && tag.tag.name[0].toUpperCase()+ tag.tag.name.slice(1)} </Link> </small>
                                                })}
                                            </CardText>
                                            <CardText>
                                                <small className="text-muted">Last updated at {`${new Date(note.created_at).getHours()}:${new Date(note.created_at).getMinutes()} , ${new Date(note.created_at).toDateString()}`} </small>
                                                <small className="text-muted">, By {note.user.name}</small>
                                            </CardText>
                                            <Link to={`/notes/${note._id}`} style={{ textDecoration: 'none', margin: '10px' }}>
                                                SHARE
                                            </Link>
                                            <Link to={`/notes/${note._id}`} style={{ textDecoration: 'none', margin: '10px' }}>
                                                READ MORE
                                            </Link>
                                        </CardBody>
                                    </Card>
                                <br/>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {user: state.user,notes: state.notes}
}

export default connect(mapStateToProps)(NoteList);
