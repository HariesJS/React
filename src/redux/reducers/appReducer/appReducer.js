import { getAuthThunk } from "../authReducer/authReducer";

const SET_INITIALIZING = 'my-app/appReducer/SET-INITIALIZING';
const SET_GLOBAL_ERROR = 'my-app/appReducer/SET-GLOBAL-ERROR';
const SET_COUNT = 'my-app/appReducer/SET-COUNT';

const initialState = {
    initializing: false,
    count: 95,
    globalError: null
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZING: return { ...state, initializing: true };
        case SET_COUNT: return { ...state, count: action.count };
        case SET_GLOBAL_ERROR: return { ...state, globalError: action.err };
        default: return state;
    }
}

const setInitializing = () => ({ type: SET_INITIALIZING });
const setGlobalErorr = err => ({ type: SET_GLOBAL_ERROR, err });
const setCount = count => ({ type: SET_COUNT, count });

export const setInitializingThunk = () => async dispatch => {
    await dispatch(getAuthThunk());
    dispatch(setInitializing());
}

export const setGlobalErrorThunk = error => (dispatch, getState) => {
    dispatch(setGlobalErorr(error));
    let count = getState().app.count;
    const int = setInterval(() => {
        dispatch(setCount(count -= 1));
        if (count === 0) {
            dispatch(setGlobalErorr(null));
            dispatch(setCount(5));
            clearInterval(int);
        }
    }, 1000);
}

export default appReducer;