import React from 'react'
import { Link} from 'react-router-dom'
import { useSelector} from 'react-redux'

import logo from '../../images/logo.png'

import Menu from './Menu'

// import Search from './Search'

const Header = () => {
    const { auth } = useSelector(state => state)
    // console.log()
    return (
        
        <div className="header bg-light">
            <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between align-middle">
                <div className="container logo">
                    <Link to="/" className="d-flex">
                        <img src={logo} alt="logo" width={35} height={35} className="my-auto" />
                        <h1 className="navbar-brand mt-2">LFHelpers</h1>
                    </Link>
                    <ul className="navbar-nav flex-row me-auto">
                        
                            {
                            auth.token 
                            ? 
                            <>
                                {/* <li className="nav-item px-2 dropdown">
                                    <span className="nav-link dropdown-toggle" id="iconDropdown" 
                                    role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                                        Find Hirers/Jobs
                                    </span>
                                    <div className="dropdown-menu" aria-labelledby="iconDropdown">
                                        <div className="container-fluid">
                                            <Search />
                                        </div>
                                    </div>
                                </li> */}
                                
                                <li className="nav-item-left px-2">
                                    <Link to="/lists" className="nav-link">
                                        My Post
                                    </Link>
                                </li>

                                <li className="nav-item-left px-2">
                                    <Link to="/jobs" className="nav-link">
                                        My Jobs
                                    </Link>
                                </li>
                            </>
                            : 
                            <>
                                <li className="nav-item px-2">
                                    
                                    <Link to="/browseJobs" className="nav-link">
                                        Browse Job
                                    </Link>
                                
                                </li>
                            </>
                            }
                            
                       
                    </ul>
                    
                    <Menu />
                </div>
            </nav>

            

            
        </div>
    )
}

export default Header