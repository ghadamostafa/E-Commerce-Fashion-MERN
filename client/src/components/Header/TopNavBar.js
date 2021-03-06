import React, { useContext } from 'react'
import { Link,useHistory } from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import { NavDropdown } from 'react-bootstrap'
import axios from 'axios';
import AuthContext from '../../context/AuthContext'
const TopNavBar = () => {
    const {loggedIn,setLoggedIn,user }=useContext(AuthContext)
    const history = useHistory();
    console.log(user.role);
    const logoutHandler=async()=> {
        await axios.post(`/logout`);
        setLoggedIn(false);
        sessionStorage.removeItem('user');
        history.push('/login')
    }
    const showCart=()=>{
        (loggedIn?history.push('/cart'):history.push('/login'))
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
                            <div className="nav-link cart" onClick={showCart}>
                                <span> <i className="fa fa-shopping-cart"></i> Cart</span>
                            </div>
                        </li>
                        <li className="nav-item ">
                            {!loggedIn ?
                                <Link className="nav-link" to="/login">
                                    <span> <i className="fa fa-user fa-fw "></i> Sign In</span>
                                </Link>
                                : <NavDropdown title={user.name} className="drowpdown">
                                    {(user.role == 'admin')?
                                    <LinkContainer to="/admin/products">
                                     <NavDropdown.Item >Products Control</NavDropdown.Item>
                                    </LinkContainer>
                                : <NavDropdown.Item >Orders</NavDropdown.Item>}
                                   
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
