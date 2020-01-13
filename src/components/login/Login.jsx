import React from 'react';
import { reduxForm } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../../App.css';
import cn from 'classnames';
import { createFiled, Input } from '../../redux/reduxForm/formsControl';
import { requireField, maxLength } from '../../redux/reduxForm/validators';
import { postAuthThunk } from '../../redux/reducers/authReducer/authReducer';
import { getAuthData, getAuthCaptcha } from '../auth/authSelectors';

const maxSymbols = maxLength(32);

const Wrapper = ({ title, children, bclass }) => {
    const content = <b className={bclass}>{title}</b>
    return (
        <div>
            <label>
                {!bclass && content}
                <div className='input-block'>
                    {bclass && content}
                    {children}
                </div>
            </label>
        </div>
    )
}

const LoginFields = ({ handleSubmit, error, captcha }) => {
    const color = useSelector(state => state.theme.color);
    return (
        <div className='login-wrapper'>
            <form onSubmit={handleSubmit} style={{ backgroundColor: color }} className={cn('profile-page', 'auth-page')}>
                <div className='auth-card'>
                    <h2>LOGIN</h2>
                    <Wrapper title='EMAIL'>
                        {createFiled(Input, 'email', [requireField, maxSymbols], 'text', 'input', 'Enter email')}
                    </Wrapper>
                    <Wrapper title='PASSWORD'>
                        {createFiled(Input, 'password', [requireField, maxSymbols], 'password', 'input', 'Enter password')}
                    </Wrapper>
                    <Wrapper title='Remember me' bclass='remember'>
                        {createFiled(Input, 'checkbox', [requireField], 'checkbox')}
                    </Wrapper>
                    {error && <div className='error_message'>{error}</div>}
                    {captcha && <div className='captcha-wrapper'>
                        <div><img src={captcha} alt='' /></div>
                        {createFiled(Input, 'captcha', [requireField])}
                    </div>}
                    <button className='form-button'>Login</button>
                    <a href='https://social-network.samuraijs.com/signUp' target='_blank' className='form-button'>
                        Create account?
                    </a>
                </div>
            </form>
        </div>
    )
}

const LoginReduxForm = reduxForm({ form: 'authpage' })(LoginFields);

const Login = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => getAuthData(state));
    const captcha = useSelector(state => getAuthCaptcha(state));

    function data(e) {
        dispatch(postAuthThunk(e.email, e.password, e.checkbox, e.captcha));
    }
    
    if (auth.isAuth) {
        return <Redirect to='/profile' />
    }
    return <LoginReduxForm onSubmit={data} captcha={captcha} />
}

export default Login;