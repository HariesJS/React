import React, { useEffect, Fragment } from 'react';
import { HashRouter, Switch, Redirect, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/store/store';
import ProfileContainer from './components/profile/ProfileContainer';
import Login from './components/login/Login';
import { setInitializingThunk } from './redux/reducers/appReducer/appReducer';
import { WithSuspense } from './components/hoc/withSuspense';
import Updates from "./components/updates/Updates";
import { setActualAuthCreator, setActualDeauthCreator } from './redux/reducers/authReducer/authReducer';
import AuthMsg from './components/hoc/AuthMsg';
import { getAdminThunk, getTechAdminThunk } from './redux/reducers/profileReducer/profileReducer';

const Users = React.lazy(() => import('./components/users/Users'));

const Project = () => {
    const dispatch = useDispatch();
    const initializing = useSelector(state => state.app.initializing);
    const globalError = useSelector(state => state.app.globalError);
    const count = useSelector(state => state.app.count);
    const data = useSelector(state => state.auth.data);
    const isActualAuth = useSelector(state => state.auth.isActualAuth);
    const isActualDeauth = useSelector(state => state.auth.isActualDeauth);
    
    useEffect(() => {
        dispatch(setInitializingThunk());
        dispatch(getAdminThunk());
        dispatch(getTechAdminThunk());
    }, []);

    let content = isActualAuth && <AuthMsg>Вы успешно вошли!</AuthMsg>

    if (isActualDeauth) {
        content = <AuthMsg>Вы успешно вышли!</AuthMsg>
    }

    if (isActualAuth || isActualDeauth) {
        setTimeout(() => {
            dispatch(setActualAuthCreator(false));
            dispatch(setActualDeauthCreator(false));
        }, 5000);
    }

    return (
        <Fragment>
            <div className='app-theme'>
                <Header />
                {globalError && (
                    <div className='global-block'>
                        <span className='global-error'>{globalError.toString()} ({count})</span>
                    </div>
                )}
                {content}
                {initializing
                ? <Switch>
                    <Redirect exact from='/' to='/profile' />
                    <Redirect exact from={`/profile/${data.id}`} to='/profile' />
                    <Route path='/login' component={Login} />
                    <Route path='/updates' component={Updates} />
                    <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
                    <Route path='/users' render={WithSuspense(Users)} />
                    <Route path='*' render={() => <div className='users-loader'>404: Not Found</div>} />
                </Switch>
                : <div className='users-loader'>INITIALIZING...</div>}
            </div>
        </Fragment>
    )
}

const App = () => (
    <HashRouter>
        <Provider store={store}>
            <Project />
        </Provider>
    </HashRouter>
)

export default App;