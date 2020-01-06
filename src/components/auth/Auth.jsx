import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { getAuthThunk, logoutMeThunk } from '../../redux/reducers/authReducer/authReducer';
import '../../App.css';

const Auth = () => {
    const dispatch = useDispatch();
    const [active, setActive] = useState(false);
    const data = useSelector(state => state.auth.data);

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
    }
    return (
        <Fragment>{
            data.isAuth
            ? <div className='logout_block'>
                <Link onMouseOver={() => setActive(true)} onClick={closeForm} className='auth-user' to='/profile'>{data.login}</Link>
                {active && <span
                    onMouseOut={() => setActive(false)}
                    className='logout'
                    onClick={logoutForm}>
                        Log Out
                    </span>}
            </div>
            : <NavLink className='auth-login' activeClassName='auth-login-active' to='/login'>LOGIN</NavLink>
        }</Fragment>
    )
}

export default Auth;