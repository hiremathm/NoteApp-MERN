import React,{useContext} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

import _ from 'lodash'
import '../css/NavLinks.css'

import {AuthContext} from '../../context/AuthContext'

const NavLinks = (props) => {
	const auth = useContext(AuthContext)

	return <ul className = "nav-links">
		{!auth.isLoggedIn ?
			// _.isEmpty(props.user) ?
            (
            	<>
	             	<li>
	                    <NavLink to="/login">Login</NavLink>
	                </li>
                </>
            )
            :
            (
            	<>
	            	<li>
						<NavLink to = "/notes"> 
							My Notes
						</NavLink>
					</li>
					<li>
						<NavLink to = "/categories"> 
							Categories
						</NavLink>
					</li>
					<li>
						<NavLink to = "/users"> 
							Users
						</NavLink>
					</li>
					<li>
						<NavLink to="/Account">Account</NavLink> 
					</li>
					<li>
						<NavLink to="/Logout">Logout</NavLink>
					</li>
				</>
        	)                 
        }      
	</ul>
}

const mapStateToProps = (state) => {
    return {user: state.user}
}

export default connect(mapStateToProps)(NavLinks);