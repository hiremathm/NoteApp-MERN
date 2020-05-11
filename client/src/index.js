import React from 'react'
import ReactDom from 'react-dom'
import configureStore from './store/configureStore'
import {Provider} from 'react-redux'
import axios from 'axios'
// import _ from 'lodash'

// actions
import {setUser} from './actions/user'

import {setNotes} from './actions/note'

import 'bootstrap/dist/css/bootstrap.min.css';

import App from './app'

const store = configureStore()

if(localStorage.getItem('userAuthToken')){
    let url = "http://localhost:3002/users/account"
    axios({
        method: 'post',
        url: url,
        data: {},
        headers: {"x-auth": localStorage.getItem('userAuthToken')}
    })
    .then(response => {
        if(!response.data.errors){
            store.dispatch(setUser(response.data))
        }
    })


    axios.get('http://localhost:3002/notes',{"headers": {"x-auth": localStorage.getItem('userAuthToken')}})
    .then(response => {
            if(!response.data.errors){
                store.dispatch(setNotes(response.data))
            }
    })
}

store.subscribe(() => {
    console.log("Store state is : ", store.getState())
})

const jsx = (
    <Provider store = {store}>
        <App/>
    </Provider>
)

ReactDom.render(jsx, document.getElementById('root'))

// import notes
// import NotesList from './components/notes/NoteList'
// import ShowNote from './components/notes/ShowNote'
// import NewNote from './components/notes/NewNote'
// import EditNote from './components/notes/EditNote'

// import categories
// import CategoryList from './components/categories/CategoryList'
// import CategoryShow from './components/categories/CategoryShow'
// import CategoryNew from './components/categories/CategoryNew'
// import CategoryEdit from './components/categories/CategoryEdit'

// import users
// import User from './components/users/UserList'
// import UserShow from './components/users/UserShow'
// import Register from './components/users/Register'
// import Login from './components/users/Login'
// import Account from './components/users/Account'
// import Logout from './components/users/Logout'

// class App extends React.Component {

//     constructor(props){
//         super(props)
//         this.state = {
//             isAuthenticated: false
//         }
//     }

//     // handleIsAuthenticated = (bool) => {
//     //     console.log("boll is ", bool)
//     //     this.setState({isAuthenticated: bool})
//     // }

//     componentDidMount = () => {
//         if(localStorage.getItem('userAuthToken')){
//             this.setState({isAuthenticated: true})
//         }
//     }

//     render(){
//         return (
//             <BrowserRouter>
//                 {/* <div> */}
//                 <Navbar color="dark" dark expand="sm">
//                     <NavbarBrand href="/notes">Keep Note <small>(MERN Stack)</small> </NavbarBrand>
//                     <Nav className="mr-auto" navbar>
//                         <NavItem>
//                             {/* <NavLink href="/notes" >Notes</NavLink>  */}
//                         </NavItem> 
//                         <NavItem>
//                             <NavLink href="/categories" >Categories</NavLink>
//                         </NavItem>

//                         <NavItem>
//                             <NavLink href="/users" >Users</NavLink>
//                         </NavItem>
//                     </Nav>
                    
//                         {_.isEmpty(this.props.user) ?
//                             (
//                                 <Nav>            
//                                     <NavItem>
//                                         <NavLink href="/register">Register</NavLink>
//                                     </NavItem>
//                                     <NavItem>
//                                         <NavLink href="/login">Login</NavLink>
//                                     </NavItem>
//                                 </Nav>  
//                                 )
//                             :
//                             (
//                                 <Nav>
//                                     <NavItem>
//                                         <NavLink href="/Account">Account</NavLink>
//                                     </NavItem> 
//                                     <NavItem>
//                                         <NavLink href="/Logout">Logout</NavLink>
//                                     </NavItem>
//                                 </Nav>        
//                             )
                             
//                         }              
//                 </Navbar>
//                 <br/>
 

//                 <Switch>
//                     {/* Notes Routes */}
//                     <Route path="/notes" component={NotesList} exact={true}></Route>
//                     <Route path="/notes/new" component={NewNote} exact={true}></Route>
//                     <Route path="/notes/edit/:id" component={EditNote} ></Route>
//                     <Route path="/notes/:id" component={ShowNote} exact={true}></Route>
                
//                     {/* Categories Routes */}
//                     <Route path="/categories" component = {CategoryList} exact={true}></Route>
//                     <Route path="/categories/new" component = {CategoryNew} exact={true}></Route>
//                     <Route path="/categories/edit/:id" component={CategoryEdit} exact={true}></Route>
//                     <Route path="/categories/:id" component={CategoryShow} exact={true}></Route>

//                     {/* Users Routes */}
//                     <Route path="/users" component={User} exact={true}></Route>
//                     <Route path="/users/:id" component = {UserShow} exact={true}></Route>
//                     <Route path="/register" component ={Register} exact={true}></Route>
//                     <Route path="/login" component={Login} exact={true}></Route>
//                     {/* <Route path="/login" render={(props) => {
//                            return <Login {...props} handleIsAuthenticated = {this.handleIsAuthenticated}/>
//                     }}></Route> */}
//                     <Route path="/account" component={Account} exact={true}></Route>
//                     <Route path="/logout" component={Logout} exact={true}></Route>
//                     {/* <Route path="/logout" render={(props) => {
//                            return <Logout {...props} handleIsAuthenticated = {this.handleIsAuthenticated}/>
//                     }}></Route> */}

//                     <Route render={() => {
//                            return <h3>Welcome to Note App</h3>
//                     }}></Route>
//                 </Switch>
//             </BrowserRouter>
//         )
//     }
// }
