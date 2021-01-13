import React from 'react'
// import axios from '../../config/config'
import {Link} from 'react-router-dom'

// import {connect} from 'react-redux'
// import {setNotes} from '../../actions/note'

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css'
// import LoadingSpinner from '../ui/LoadingSpinner'

import {useSelector} from 'react-redux'

const NoteList = () => {
    const user = useSelector(state => state.user)
    const notes = useSelector(state => state.notes)

    return(
        <div className="container" >                
            <div className="row">
                <div className="col-md-8 col-sm-8 col-xs-8 col-lg-8">
                    { <Link to="/notes/new">Create Note</Link> }
                </div>
                <div className="col-sm-3 username">
                    Total Notes are: {notes.length} by <b><small>{user.name}</small></b>
                </div>
            </div>

            <div className="row">

                {notes && notes.map(note => {
                    return(
                        <div key = {note._id} className="col-sm-4 noteslist">
                            <div className="card"> 
                                <div className="card-body">
                                    
                                    <p className="cardtitle">{note.title.toUpperCase()}</p>
                                    <div className="notetags">
                                    <small className="text-muted">Tags : </small> 
                                    {note.tags && note.tags.map(tag => {
                                        return <small key={tag._id} className="text-muted"><Link key={tag._id} to={`/tags/${tag._id}`}>{tag.tag.name && tag.tag.name[0].toUpperCase()+ tag.tag.name.slice(1)} </Link> </small>
                                    })}
                                    </div>
                                    <div className="notedate">
                                        <small className="text-muted">Last updated at {`${new Date(note.created_at).getHours()}:${new Date(note.created_at).getMinutes()} , ${new Date(note.created_at).toDateString()}`} </small>
                                        <small className="text-muted">, By {note.user.name}</small>
                                    </div>
                                    <div>
                                        <Link to={`/notes/${note._id}`} style={{ textDecoration: 'none', margin: '10px' }}>
                                            SHARE
                                        </Link>
                                        <Link to={`/notes/${note._id}`} style={{ textDecoration: 'none', margin: '10px' }}>
                                            READ MORE
                                        </Link>
                                    </div>
                                </div>     
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default NoteList;