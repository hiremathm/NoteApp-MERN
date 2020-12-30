import React,{useState, useCallback, useEffect} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

// actions
import {connect} from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
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

import MainNavigation from './components/ui/MainNavigation'

import {AuthContext} from './context/AuthContext'

const App = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
    const login = useCallback(() => {
        setIsLoggedIn(true)
    },[])

    const logout = useCallback(() => {
        setIsLoggedIn(false)
    },[])


    useEffect(() => {
        if(localStorage.getItem('userAuthToken')){
            setIsLoggedIn(true)
        }else{
            setIsLoggedIn(false)
        }       
    })


    return (
        <AuthContext.Provider value = {{isLoggedIn, login, logout}}>
            <BrowserRouter>
                <MainNavigation />

                <main>
                    <Switch>
                        {isLoggedIn ? (
                            <>
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
                                <Route path="/account" component={Account} exact={true}></Route>
                                <Route path="/logout" component={Logout} exact={true}></Route>
                                <Redirect to="/notes" />
                            </>
                        ):(
                            <>
                                <Route path="/login" component={Login} exact={true}></Route>
                                <Redirect to="/login" />
                            </>
                        )}

                    </Switch>
                </main>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

const mapStateToProps = (state) => {
    return {user: state.user}
}

export default connect(mapStateToProps)(App);