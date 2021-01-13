import React from 'react'
import ReactDom from 'react-dom'
import configureStore from './store/configureStore'
import {Provider} from 'react-redux'
// import axios from './config/config'
// import axios from 'axios'
// import _ from 'lodash'

// actions
// import {setUser} from './actions/user'

// import {setNotes} from './actions/note'

import 'bootstrap/dist/css/bootstrap.min.css';

import App from './app'

const store = configureStore()

// if(localStorage.getItem('userAuthToken')){
//     let url = "/users/account"
//     axios({
//         method: 'post',
//         url: url,
//         data: {},
//         headers: {"x-auth": localStorage.getItem('userAuthToken')}
//     })
//     .then(response => {
//         if(!response.data.errors){
//             store.dispatch(setUser(response.data))
//         }
//     })

//     axios.get('/notes',{"headers": {"x-auth": localStorage.getItem('userAuthToken')}})
//     .then(response => {
//             if(!response.data.errors){
//                 store.dispatch(setNotes(response.data))
//             }
//     })
// }

store.subscribe(() => {
    console.log("Store state is : ", store.getState())
})

const jsx = (
    <Provider store = {store}>
        <App/>
    </Provider>
)

ReactDom.render(jsx, document.getElementById('root'))