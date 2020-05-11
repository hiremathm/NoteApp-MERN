import React from 'react'
import {BrowserRouter, Route,Switch,Link} from 'react-router-dom'
import {Navbar, NavbarBrand, Nav, NavItem} from 'reactstrap'
import _ from 'lodash'

// actions
import {connect} from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css';

// import notes
import NotesList from './components/notes/NoteList'
import ShowNote from './components/notes/ShowNote'
import NewNote from './components/notes/NewNote'
import EditNote from './components/notes/EditNote'

// import categories
import CategoryList from './components/categories/CategoryList'
import CategoryShow from './components/categories/CategoryShow'
import CategoryNew from './components/categories/CategoryNew'
import CategoryEdit from './components/categories/CategoryEdit'

// import users
import User from './components/users/UserList'
import UserShow from './components/users/UserShow'
import Register from './components/users/Register'
import Login from './components/users/Login'
import Account from './components/users/Account'
import Logout from './components/users/Logout'


class App extends React.Component {

    // constructor(props){
    //     super(props)
    //     this.state = {
    //         isAuthenticated: false
    //     }
    // }

    // handleIsAuthenticated = (bool) => {
    //     console.log("boll is ", bool)
    //     this.setState({isAuthenticated: bool})
    // }

    // componentDidMount = () => {
    //     if(localStorage.getItem('userAuthToken')){
    //         this.setState({isAuthenticated: true})
    //     }
    // }

    render(){
        return (
            <BrowserRouter>
                {/* <div> */}
                <Navbar color="dark" dark expand="sm" style={{height: '60px'}}>
                    <NavbarBrand> 
                        Keep Note 
                    </NavbarBrand>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <Link to="/notes" style={{ textDecoration: 'none', margin: '10px' }}>Notes</Link> 
                        </NavItem> 
                        <NavItem>
                            <Link to="/categories" style={{ textDecoration: 'none', margin: '10px' }} >Categories</Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/users" style={{ textDecoration: 'none', margin: '10px' }} >Users</Link>                            
                        </NavItem>
                    </Nav>
                        {_.isEmpty(this.props.user) ?
                            (
                                <Nav>            
                                    <NavItem>
                                        <Link to="/register" style={{ textDecoration: 'none', margin: '10px' }}>Register</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link to="/login" style={{ textDecoration: 'none', margin: '10px' }}>Login</Link>
                                    </NavItem>
                                </Nav>  
                                )
                            :
                            (
                                <Nav>
                                    <NavItem>
                                        <Link to="/Account" style={{ textDecoration: 'none', margin: '10px' }}>Account</Link>
                                    </NavItem> 
                                    <NavItem>
                                         <Link to="/Logout" style={{ textDecoration: 'none', margin: '10px' }}>Logout</Link>
                                    </NavItem>
                                </Nav>        
                            )
                             
                        }              
                </Navbar>
                <br/>
 

                <Switch>
                    {/* Notes Routes */}
                    <Route path="/notes" component={NotesList} exact={true}></Route>
                    <Route path="/notes/new" component={NewNote} exact={true}></Route>
                    <Route path="/notes/edit/:id" component={EditNote} ></Route>
                    <Route path="/notes/:id" component={ShowNote} exact={true}></Route>
                
                    {/* Categories Routes */}
                    <Route path="/categories" component = {CategoryList} exact={true}></Route>
                    <Route path="/categories/new" component = {CategoryNew} exact={true}></Route>
                    <Route path="/categories/edit/:id" component={CategoryEdit} exact={true}></Route>
                    <Route path="/categories/:id" component={CategoryShow} exact={true}></Route>

                    {/* Users Routes */}
                    <Route path="/users" component={User} exact={true}></Route>
                    <Route path="/users/:id" component = {UserShow} exact={true}></Route>
                    <Route path="/register" component ={Register} exact={true}></Route>
                    <Route path="/login" component={Login} exact={true}></Route>
                    {/* <Route path="/login" render={(props) => {
                           return <Login {...props} handleIsAuthenticated = {this.handleIsAuthenticated}/>
                    }}></Route> */}
                    <Route path="/account" component={Account} exact={true}></Route>
                    <Route path="/logout" component={Logout} exact={true}></Route>
                    {/* <Route path="/logout" render={(props) => {
                           return <Logout {...props} handleIsAuthenticated = {this.handleIsAuthenticated}/>
                    }}></Route> */}

                    <Route render={() => {
                           return <h3>Welcome to Note App</h3>
                    }}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = (state) => {
    return {user: state.user}
}

export default connect(mapStateToProps)(App);