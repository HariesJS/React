import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { getAuthThunk, logoutMeThunk, setActualDeauthCreator } from '../../redux/reducers/authReducer/authReducer';
import '../../App.css';
import { setThemeColorCreator } from '../../redux/reducers/themeReducer/themeReducer';
import { getAuthData } from './authSelectors';
import { getThemeColor } from '../theme/themeSelectors';
import { WithSetOffline } from '../hoc/WithSetOffline';
import { getUsersIsOnline } from '../users/usersSelectors';
import { setOfflineStatusThunk } from '../../redux/reducers/usersReducer/usersReducer';

const Auth = () => {
    const dispatch = useDispatch();
    const [active, setActive] = useState(false);
    const data = useSelector(state => getAuthData(state));
    const color = useSelector(state => getThemeColor(state));
    const isOnline = useSelector(state => getUsersIsOnline(state));

    const loadData = useCallback(() => dispatch(getAuthThunk()), [getAuthThunk]);
    
    useEffect(() => {
        loadData();
    }, [loadData]);

    const closeForm = () => {
        if (active) {
            setActive(false);
        }
    }

    const logoutForm = () => {
        setActive(false);
        dispatch(logoutMeThunk());
        localStorage.setItem('theme', '#3959ab');
        dispatch(setThemeColorCreator('#3959ab'));
        dispatch(setActualDeauthCreator(true));
        WithSetOffline(isOnline, dispatch, data, setOfflineStatusThunk);
    }
    return (
        <Fragment>{
            data.isAuth
            ? <div>
                <Link
                    onMouseOver={() => setActive(true)}
                    onClick={closeForm}
                    className='auth-user' to='/profile'>
                        {data.login}
                    </Link>
                {active && (
                    <span
                        onMouseOut={() => setActive(false)}
                        className='logout'
                        onClick={logoutForm}
                        style={{ backgroundColor: color }}>
                        Log Out
                    </span>
                )}
            </div>
            : <NavLink className='auth-login' activeClassName='auth-login-active' to='/login'>LOGIN</NavLink>
        }</Fragment>
    )
}

export default Auth;