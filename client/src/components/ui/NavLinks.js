import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

import _ from 'lodash'
import '../css/NavLinks.css'

const NavLinks = (props) => {
	return <ul className = "nav-links">
		<li>
			<NavLink to = "/notes"> 
				My Notes
			</NavLink>
			<NavLink to = "/categories"> 
				Categories
			</NavLink>
			<NavLink to = "/users"> 
				Users
			</NavLink>

			{_.isEmpty(props.user) ?
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
		</li>
	</ul>
}

const mapStateToProps = (state) => {
    return {user: state.user}
}

export default connect(mapStateToProps)(NavLinks);