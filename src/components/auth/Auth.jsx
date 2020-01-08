import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { getAuthThunk, logoutMeThunk, setActualDeauthCreator } from '../../redux/reducers/authReducer/authReducer';
import '../../App.css';
import { setThemeColorCreator } from '../../redux/reducers/themeReducer/themeReducer';

const Auth = () => {
    const dispatch = useDispatch();
    const [active, setActive] = useState(false);
    const data = useSelector(state => state.auth.data);
    const color = useSelector(state => state.theme.color);

    const loadData = useCallback(() => dispatch(getAuthThunk()), [getAuthThunk]);
    
    useEffect(() => {
        loadData();
    }, []);

    const closeForm = () => {
        if (active) {
            setActive(false);
        }
    }

    const logoutForm = () => {
        setActive(false);
        dispatch(logoutMeThunk());
        dispatch(setThemeColorCreator('#3959ab'));
        dispatch(setActualDeauthCreator(true));
    }
    return (
        <Fragment>{
            data.isAuth
            ? <div>
                <Link onMouseOver={() => setActive(true)} onClick={closeForm} className='auth-user' to='/profile'>{data.login}</Link>
                {active && <span
                    onMouseOut={() => setActive(false)}
                    className='logout'
                    onClick={logoutForm}
                    style={{ backgroundColor: color }}>
                        Log Out
                    </span>}
            </div>
            : <NavLink className='auth-login' activeClassName='auth-login-active' to='/login'>LOGIN</NavLink>
        }</Fragment>
    )
}

export default Auth;