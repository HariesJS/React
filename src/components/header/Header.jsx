import React, { useState, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../../App';
import Auth from '../auth/Auth';
import Theme from '../theme/Theme';

const Header = () => {
    const color = useSelector(state => state.theme.color);
    const data = useSelector(state => state.auth.data);
    const [active, setActive] = useState(false);

    const setNavBar = (url, link) => {
        return (
            <div>
                <NavLink className='route' to={url}>
                    {link}
                </NavLink>
            </div>
        )
    }

    const selectActive = () => {
        if (active) {
            return setActive(false);
        } else {
            return setActive(true);
        }
    }

    const url = 'https://s3.amazonaws.com/www-inside-design/uploads/2019/08/color_wheel-810x810.png';
    return (
        <Fragment>
            <div className='header-wrapper'>
                <div className='header' style={{ backgroundColor: color }}>
                    <div className='title'>
                        <span>Haries Network</span>
                        <span className='beta-title'>beta</span>
                    </div>
                    <span className='border-title'>|</span>
                    {data.isAuth && (
                        <div>
                            <img
                                className='color-img'
                                onClick={selectActive}
                                src={url}
                                width={30}
                                alt=''
                            />
                            {active && <Theme />}
                        </div>
                    )}
                    {setNavBar('/updates', 'UPDATES')}
                    {setNavBar('/profile', 'PROFILE')}
                    {setNavBar('/users', 'USERS')}
                    <Auth />
                </div>
            </div>
        </Fragment>
    )
}

export default Header;