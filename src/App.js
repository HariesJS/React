import React, { useEffect, Fragment } from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/store/store';
import ProfileContainer from './components/profile/ProfileContainer';
import Login from './components/login/Login';
import { setInitializingThunk } from './redux/reducers/appReducer/appReducer';

const Users = React.lazy(() => import('./components/users/Users'));

const Project = () => {
    const dispatch = useDispatch();
    const initializing = useSelector(state => state.app.initializing);
    const globalError = useSelector(state => state.app.globalError);
    const count = useSelector(state => state.app.count);

    useEffect(() => {
        dispatch(setInitializingThunk());
    }, []);

    return (
        <Fragment>
            <Header />
            {globalError && <div className='global-error'>
                {globalError.toString()} ({count})
            </div>}
            {initializing
            ? <Switch>
                <Redirect exact from='/' to='/profile' />
                <Route path='/login' component={Login} />
                <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
                <Route path='/users' render={() => <React.Suspense fallback={<div className='users-loader'>SUSPENSE LOADING...</div>}><Users /></React.Suspense>} />
                <Route path='*' render={() => <div className='users-loader'>404: Not Found</div>} />
            </Switch>
            : <div className='users-loader'>INITIALIZING...</div>}
        </Fragment>
    )
}

const App = () => (
    <BrowserRouter>
        <Provider store={store}>
            <Project />
        </Provider>
    </BrowserRouter>
)

export default App;