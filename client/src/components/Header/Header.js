import React from 'react';
import './Header.css'
import TopNavBar from './TopNavBar'
import BottomNavBar from './BottomNavBar'

const Header = () => {
    return (
        <header>
            <TopNavBar />
            <BottomNavBar />
        </header>
    )
}

export default Header