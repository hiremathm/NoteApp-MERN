import React, {useState} from 'react'
import {Link, NavLink} from 'react-router-dom'

import MainHeader from './MainHeader'
import '../css/MainNavigation.css'
import NavLinks from './NavLinks'
import SideDrawer from './SideDrawer'
import BackDrop from './BackDrop'

import {connect} from 'react-redux'

import _ from 'lodash'

const MainNavigation = (props) => {
	const [isDrawerOpen, setDrawerState] = useState(false)

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
							<NavLink to = "/notes"> 
								My Notes
							</NavLink>
							<NavLink to = "/categories"> 
								Categories
							</NavLink>
							<NavLink to = "/users"> 
								Users
							</NavLink>


							{	_.isEmpty(props.user) ?
			                	(
				             		<>
				                    	<NavLink to="/register">Register</NavLink>
				                    	<NavLink to="/login">Login</NavLink>
				                	</>
			                	)
			                	:
			                	(
			                		<>
									<NavLink to="/Account">Account</NavLink> 
									<NavLink to="/Logout">Logout</NavLink>
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