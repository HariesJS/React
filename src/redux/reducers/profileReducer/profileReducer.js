import { profileAPI } from "../../../api/ajax";
import { stopSubmit } from "redux-form";

const GET_PROFILE = 'my-app/profileReducer/GET-PROFILE';
const PUT_IMAGE = 'my-app/profileReducer/PUT-IMAGE';
const GET_STATUS = 'my-app/profileReducer/GET-STATUS';

const initialState = {
    profile: null,
    status: null
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROFILE:
        case GET_STATUS: return { ...state, ...action.data };
        case PUT_IMAGE: return { ...state, profile: { ...state.profile, photos: action.img } };
        default: return state;
    }
}

const getProfileCreator = profile => ({ type: GET_PROFILE, data: { profile } });
const getStatusCreator = status => ({ type: GET_STATUS, data: { status } })
const putImageCreator = img => ({ type: PUT_IMAGE, img });

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

export default profileReducer;