import React, {useState, useContext} from 'react'
import {Link, NavLink} from 'react-router-dom'
import { IoLogIn, IoLogOut, IoList, IoPersonCircle } from "react-icons/io5";

import MainHeader from './MainHeader'
import '../css/MainNavigation.css'
import NavLinks from './NavLinks'
import SideDrawer from './SideDrawer'
import BackDrop from './BackDrop'

import {connect} from 'react-redux'

// import _ from 'lodash'

import {AuthContext} from '../../context/AuthContext'

const MainNavigation = (props) => {
	const [isDrawerOpen, setDrawerState] = useState(false)
	const auth = useContext(AuthContext)

	const setDrawer = () => {
		console.log("set drawer")
		setDrawerState(!isDrawerOpen)
	}

	return (
		<React.Fragment>
			{
				isDrawerOpen && (<BackDrop onClick = {setDrawer}/>)
			}
			{
				isDrawerOpen && ( 
					<SideDrawer>
						<nav className = "main-navigation__drawer-nav">
							<NavLink to="/" className="home"><h2>Keep Notes</h2></NavLink>
							{	!auth.isLoggedIn ?
								// _.isEmpty(props.user) ?
			                	(
				             		<>
				                    	<NavLink to="/login" onClick = {setDrawer}><IoLogIn size = {25} className = "icon"/> Login</NavLink>
				                	</>
			                	)
			                	:
			                	(
			                		<>
			                		<NavLink to = "/notes" onClick = {setDrawer}> 
										<IoList size = {25} className = "icon"/> My Notes									
									</NavLink>
									<NavLink to = "/categories" onClick = {setDrawer}> 
										<IoList size = {25}  className = "icon"/> Categories
									</NavLink>
									<NavLink to = "/users" onClick = {setDrawer}> 
										<IoList size = {25} className = "icon"/> All Users
									</NavLink>

									<NavLink to="/Account" onClick = {setDrawer}><IoPersonCircle size = {25} className = "icon"/> Account</NavLink> 
									<NavLink to="/Logout" onClick = {setDrawer}><IoLogOut size = {25} className = "icon"/> Logout</NavLink>
			            			</>
			            		)                     
							}
						</nav>
					</SideDrawer>
				)
			}
			<MainHeader>
				<button className="main-navigation__menu-btn" onClick = {setDrawer}>
			        <span />
			        <span />
			        <span />
			    </button>

				<h1 className="main-navigation__title">
					<Link to="/">Keep Notes</Link>
				</h1>
				<nav className = "main-navigation__header-nav">
					<NavLinks/> 
				</nav>
			</MainHeader>
		</React.Fragment>
	)
}

const mapStateToProps = (state) => {
    return {user: state.user}
}
export default connect(mapStateToProps)(MainNavigation);