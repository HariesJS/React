import { authAPI, captchaAPI } from "../../../api/ajax";
import { stopSubmit } from "redux-form";

const GET_AUTH = 'my-app/authReducer/GET-AUTH';
const GET_CAPTCHA ='my-app/authReducer/GET-CAPTCHA';
const SET_ACTUAL_AUTH = 'my-app/authReducer/SET-ACTUAL-AUTH';
const SET_ACTUAL_DEAUTH = 'my-app/authReducer/SET-ACTUAL-DEAUTH';

const initialState = {
    data: {
        isAuth: false
    },
    captcha: null,
    isActualAuth: false,
    isActualDeauth: false
}

const handlers = {
    [GET_AUTH]: (state, { data, isAuth }) => ({
        ...state, data: { ...data, isAuth }
    }),
    [GET_CAPTCHA]: (state, { captcha }) => ({
        ...state, captcha
    }),
    [SET_ACTUAL_AUTH]: (state, { bol }) => ({
        ...state, isActualAuth: bol
    }),
    [SET_ACTUAL_DEAUTH]: (state, { bol }) => ({
        ...state, isActualDeauth: bol
    }),
    DEFAULT: state => state
}

const authReducer = (state = initialState, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT;
    return handler(state, action);
}

const getAuthCreator = (id, login, email, isAuth) => ({ type: GET_AUTH, data: { id, login, email }, isAuth });
const getCaptchaCreator = captcha => ({ type: GET_CAPTCHA, captcha });
export const setActualAuthCreator = bol => ({ type: SET_ACTUAL_AUTH, bol });
export const setActualDeauthCreator = bol => ({ type: SET_ACTUAL_DEAUTH, bol });

export const getAuthThunk = () => async dispatch => {
    const response = await authAPI.getAuth();
    if (response.data.resultCode === 0) {
        const { id, login, email } = response.data.data;
        dispatch(getAuthCreator(id, login, email, true));
    }
}

export const postAuthThunk = (email, password, rememberMe, captcha) => async dispatch => {
    const response = await authAPI.postAuth(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        dispatch(getAuthThunk());
        dispatch(getCaptchaCreator(null));
        dispatch(setActualAuthCreator(true));
    } else {
        if (response.data.resultCode === 10) {
            const request = await captchaAPI.getCaptcha();
            dispatch(getCaptchaCreator(request.data.url));
        }
        dispatch(stopSubmit('authpage', { _error: response.data.messages[0] }));
    }
}

export const logoutMeThunk = () => async dispatch => {
    const response = await authAPI.deleteAuth();
    if (response.data.resultCode === 0) {
        dispatch(getAuthCreator(null, null, null, false));
    }
}

export default authReducer;