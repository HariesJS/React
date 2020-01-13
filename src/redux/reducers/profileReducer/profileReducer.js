import { profileAPI, adminAPI } from "../../../api/ajax";
import { stopSubmit } from "redux-form";

const GET_PROFILE = 'my-app/profileReducer/GET-PROFILE';
const PUT_IMAGE = 'my-app/profileReducer/PUT-IMAGE';
const GET_STATUS = 'my-app/profileReducer/GET-STATUS';
const GET_ADMIN = 'my-app/profileReducer/GET_ADMIN';
const GET_TECH_ADMIN = 'my-app/profileReducer/GET-TECH-ADMIN';

const initialState = {
    profile: null,
    status: null,
    isTechAdmin: [],
    isAdmin: []
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROFILE:
        case GET_STATUS: return { ...state, ...action.data };
        case PUT_IMAGE: return { ...state, profile: { ...state.profile, photos: action.img } };
        case GET_ADMIN: return { ...state, isAdmin: action.isAdmin };
        case GET_TECH_ADMIN: return { ...state, isTechAdmin: action.isTechAdmin };
        default: return state;
    }
}

const getProfileCreator = profile => ({ type: GET_PROFILE, data: { profile } });
const getStatusCreator = status => ({ type: GET_STATUS, data: { status } });
const putImageCreator = img => ({ type: PUT_IMAGE, img });
const getAdminCreator = isAdmin => ({ type: GET_ADMIN, isAdmin });
const getTechAdminCreator = isTechAdmin => ({ type: GET_TECH_ADMIN, isTechAdmin });

export const getProfileThunk = id => async dispatch => {
    const response = await profileAPI.getProfile(id);
    dispatch(getProfileCreator(response.data));
}

export const putImageThunk = img => async dispatch => {
    const response = await profileAPI.putImage(img);
    if (response.data.resultCode === 0) {
        dispatch(putImageCreator(response.data.data.photos));
    }
}

export const putProfileThunk = obj => async (dispatch, getState) => {
    const id = getState().auth.data.id;
    const response = await profileAPI.putProfile(obj);
    if (response.data.resultCode === 0) {
        dispatch(getProfileThunk(id));
    } else {
        dispatch(stopSubmit('profilepage', { _error: response.data.messages[0] }));
        return Promise.reject();
    }
}

export const getStatusThunk = id => async dispatch => {
    const response = await profileAPI.getStatus(id);
    dispatch(getStatusCreator(response.data));
}

export const putStatusThunk = status => async dispatch => {
    const response = await profileAPI.putStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(getStatusCreator(status));
    }
}

async function adminData(request, dispatch, actionCreator) {
    const response = await request();
    const data = Object.keys(response.data).map(e => ({ code: response.data[e], id: e }));
    if (data) {
        dispatch(actionCreator(data));
    }
}

export const getAdminThunk = () => dispatch => {
    adminData(adminAPI.getAdmin, dispatch, getAdminCreator);
}

export const getTechAdminThunk = () => dispatch => {
    adminData(adminAPI.getTechAdmin, dispatch, getTechAdminCreator);
}

export const addAdminThunk = id => async dispatch => {
    await adminAPI.addAdmin(id);
    dispatch(getAdminThunk());
}

export const removeAdminThunk = id => async dispatch => {
    await adminAPI.removeAdmin(id);
    dispatch(getAdminThunk());
}

export default profileReducer;