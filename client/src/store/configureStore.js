import {createStore , combineReducers, applyMiddleware} from 'redux'
import usersReducers from '../reducers/users'
import notesReducers from '../reducers/notes'
import ReduxThunk from 'redux-thunk'


const configureStore  = () => {
    const store = createStore(combineReducers({
        user: usersReducers,
        notes: notesReducers
    }), applyMiddleware(ReduxThunk))
    return store
}

export default configureStore;