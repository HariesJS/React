import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import '../../App';
import Auth from '../auth/Auth';

const Header = () => {
    const setNavBar = (url, link) => {
        return (
            <div>
                <NavLink className='route' to={url}>
                    {link}
                </NavLink>
            </div>
        )
    }

    return (
        <Fragment>
            <div className='header'>
                <div className='title'>
                    <span>Haries Network</span>
                </div>
                <span style={{ color: 'white', fontSize: 20 }}>|</span>
                {setNavBar(`/${Math.floor(Math.random()*999)}`, 'HIDE ALL')}
                {setNavBar('/profile', 'PROFILE')}
                {setNavBar('/users', 'USERS')}
                <Auth />
            </div>
        </Fragment>
    )
}

export default Header;