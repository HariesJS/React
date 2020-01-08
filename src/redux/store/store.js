import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import usersReducer from '../reducers/usersReducer/usersReducer';
import profileReducer from '../reducers/profileReducer/profileReducer';
import authReducer from '../reducers/authReducer/authReducer';
import appReducer from '../reducers/appReducer/appReducer';
import themeReducer from '../reducers/themeReducer/themeReducer';

const reducers = combineReducers({
    form: formReducer,
    usersPage: usersReducer,
    profilePage: profileReducer,
    auth: authReducer,
    app: appReducer,
    theme: themeReducer
})

const store = createStore(reducers, applyMiddleware(thunk));

export default store;