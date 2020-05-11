import {createStore , combineReducers} from 'redux'
import usersReducers from '../reducers/users'
import notesReducers from '../reducers/notes'

const configureStore  = () => {
    const store = createStore(combineReducers({
        user: usersReducers,
        notes: notesReducers
    }))
    return store
}

export default configureStore;