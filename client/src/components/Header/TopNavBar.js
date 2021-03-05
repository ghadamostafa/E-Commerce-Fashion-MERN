import React, { useContext } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { NavDropdown } from 'react-bootstrap'
import axios from 'axios';
import AuthContext from '../../context/AuthContext'
const TopNavBar = () => {
    const {loggedIn,setLoggedIn,userName }=useContext(AuthContext)
    const history = useHistory();
    const logoutHandler=async()=> {
        await axios.post(`/logout`);
        setLoggedIn(false);
        history.push('/login')
    }
    return (
        <nav className="navbar navbar-expand-md navbar-light shadow-sm header-top" >
            <div className="container">
                <div className="navbar-brand " >
                    <img src="logo192.png" width="30" height="30" className="d-inline-block align-top" alt="" />
                    <span>Fashion E-Commerce</span>
                </div>

                <div className="collapse navbar-collapse" >
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item ">
                            <form className="form-inline ml-2" >
                                <input className="form-control searchBar" type="search" placeholder="Search" aria-label="Search" size="70" />
                            </form>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item ">
                            <Link className="nav-link" to="/cart">
                                <span> <i className="fa fa-shopping-cart"></i> Cart</span>
                            </Link>
                        </li>
                        <li className="nav-item ">
                            {!loggedIn ?
                                <Link className="nav-link" to="/login">
                                    <span> <i className="fa fa-user fa-fw "></i> Sign In</span>
                                </Link>
                                : <NavDropdown title={userName} className="drowpdown">
                                    <Link className="nav-link" to="#">
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </Link>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default TopNavBar