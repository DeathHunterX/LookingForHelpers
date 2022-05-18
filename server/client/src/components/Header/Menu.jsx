import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { logout } from '../../redux/actions/authAction'



import Avatar from '../Avatar'
// Import icons
import 
{
    FaHome,
    FaCompass,
    // FaBell
} from 'react-icons/fa'

import {
    AiFillMessage,
    AiOutlinePlus
} from 'react-icons/ai'

import {
    GrProjects
} from 'react-icons/gr'

import {
    BsFileEarmarkPost
} from 'react-icons/bs'

const Menu = () => {
    const bfLoginLink = [
        {label: 'Login', icon: "", path: '/login'},
        {label: 'Register', icon: "", path: '/register'}
    ]

    const afLoginLinks = [
        {label: 'Home', path: '/'},
        {label: 'Browse', path: '/browseJobs'},
        {label: 'List', path: '/lists'},
        {label: 'Jobs', path: '/jobs'},
        // {label: 'Notification',  path: '/notify'},
        {label: 'Message', path: '/message'},
        {label: 'CreatePost', path: '/createPost'}
    ]

    const icons  = [
        FaHome, 
        FaCompass,
        BsFileEarmarkPost,
        GrProjects,
        // FaBell, 
        AiFillMessage, 
        AiOutlinePlus
    ]

    const { auth, theme } = useSelector(state => state)
    const dispatch = useDispatch()
    const { pathname } = useLocation()

    
    const isActive = (pn) => {
        if (pn === pathname) return 'active' 
        else return ''
    }

    const navLinks = auth.token ? afLoginLinks : bfLoginLink
    
    return (
        <div className={ auth.token ? "menu" : "" }>
            <ul className="navbar-nav flex-row bg-light">
                
                {auth.token ? 
                (
                    navLinks.map((link, index) => { 
                        const Icon = icons[index]
                        return (
                        <li className={`nav-item px-2 ${isActive(link.path)} ${link.label}`} key={index}>
                            <Link className="nav-link" to={link.path}>
                                <span className="menu-item">{link.label}</span>
                                <Icon className="menu-icon"/>
                            </Link>
                        </li>
                    )})
                ) : ( 
                    navLinks.map((link, index) => { 
                        return (
                        <li className={`nav-item px-2 ${isActive(link.path)}`} key={index}>
                            <Link className="nav-link" to={link.path}>
                                {link.label }
                            </Link>
                        </li>
                    )})
                )}
                

                {auth.user && 
                    <li className="nav-item dropdown">
                        <span className="nav-link" id="navbarDropdown" 
                        role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <Avatar src={auth.user.avatar} size="medium-avatar"/>
                        </span>
                        
                        <div className="dropdown-menu avatar-menu" aria-labelledby="navbarDropdown">
                            <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>Profile</Link>

                            <label htmlFor="theme" className="dropdown-item"
                            onClick={() => dispatch({
                                type: GLOBALTYPES.THEME, payload: !theme
                            })}>
                                {theme ? 'Light Mode' : 'Dark Mode'}
                            </label>

                            <hr className="dropdown-divider"/>
                            <Link className="dropdown-item" to="/"
                            onClick={() => dispatch(logout())}>
                                Log Out
                            </Link>
                        </div>
                    </li>
                }

            </ul>
        </div>
    )
}

export default Menu