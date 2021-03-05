import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {Menu,MenuItem,MenuButton} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import axios from 'axios';

const BottomNavBar = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            const { data } = await axios.get('/categories/navbar')
            setCategories(data.data);
        }
        fetchCategories();

    }, [])
    return (
        <nav className="navbar navbar-expand-md  header-bottom">
            <button type="button" className="navbar-toggler bg-light" data-toggle="collapse" data-target="#nav">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-between" id="nav">
                <ul className="navbar-nav">
                    <li className="nav-item" >
                        <Link to="/" className="nav-link text-light px-3">Home </Link>
                    </li>

                    <li className="nav-item " >
                        <Link to="/categories" className="nav-link text-light  px-3 " >
                            All Categories
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/shop" className="nav-link text-light  px-3" >Shop</Link>
                    </li>
                    {/* main categories */}
                    {categories&&categories.map((category) => {
                        return <li className="nav-item" key={category._id}>
                            <Menu menuButton=
                                {<MenuButton className="menu-btn-color">
                                    {category.name}
                                </MenuButton>}>
                                {/* subCategories */}
                                {category.subCategories.map((subCategory) =>{
                                   return <MenuItem key={subCategory._id}>
                                            <Link to={`/shop?category=${subCategory.slug}`} >
                                                    {subCategory.name}
                                            </Link>
                                           </MenuItem>
                                    } )}
                            </Menu>
                        </li>
                    })}
                </ul>
            </div>
        </nav>
    )
}

export default BottomNavBar
