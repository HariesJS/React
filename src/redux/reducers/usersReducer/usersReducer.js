import { usersAPI, followAPI, onlineAPI } from "../../../api/ajax";
import { setGlobalErrorThunk } from "../appReducer/appReducer";
import { followThunk, followLogic } from '../../../objects-helper/patterns';

const GET_USERS = 'my-app/usersReducer/GET-USERS';
const POST_FOLLOW = 'my-app/usersReducer/POST-FOLLOW';
const DELETE_FOLLOW = 'my-app/usersReducer/DELETE-FOLLOW';
const SET_DISABLED = 'my-app/usersReducer/SET-DISABLED';
const SET_LOADER = 'my-app/usersReducer/SET-LOADER';
const GET_TOTAL_COUNT = 'my-app/usersReducer/GET-TOTAL-COUNT';
const SET_CURRENT_PAGE = 'my-app/usersReducer/SET-CURRENT-PAGE';
const GET_ONLINE_STATUS = 'my-app/usersReducer/GET-ONLINE-STATUS';

const initialState = {
    users: [],
    isDisabled: [],
    isLoad: false,
    currentPage: 2,
    pageCount: 30,
    totalCount: null,
    isOnline: []
}

const handlers = {
    [GET_USERS]: (state, { users }) => ({
        ...state, users
    }),
    [POST_FOLLOW]: (state, { id }) => followLogic(state, id, true),
    [DELETE_FOLLOW]: (state, { id }) => followLogic(state, id, false),
    [SET_DISABLED]: (state, { bolean, userId }) => ({
        ...state, isDisabled: bolean
        ? [...state.isDisabled, userId]
        : state.isDisabled.filter(id => id !== userId)
    }),
    [SET_LOADER]: (state, { isLoad }) => ({
        ...state, isLoad
    }),
    [GET_TOTAL_COUNT]: (state, { totalCount }) => ({
        ...state, totalCount
    }),
    [SET_CURRENT_PAGE]: (state, { currentPage }) => ({
        ...state, currentPage
    }),
    [GET_ONLINE_STATUS]: (state, { isOnline }) => ({
        ...state, isOnline
    }),
    DEFAULT: state => state
}

const usersReducer = (state = initialState, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT;
    return handler(state, action);
}

const getUsersCreator = users => ({ type: GET_USERS, users });
const followCreator = id => ({ type: POST_FOLLOW, id });
const unfollowCreator = id => ({ type: DELETE_FOLLOW, id });
const setDisabled = (bolean, userId) => ({ type: SET_DISABLED, bolean, userId });
const setLoader = isLoad => ({ type: SET_LOADER, isLoad });
const getTotalCount = totalCount => ({ type: GET_TOTAL_COUNT, totalCount });
const setCurrentPage = currentPage => ({ type: SET_CURRENT_PAGE, currentPage });
const getOnlineStatusCreator = isOnline => ({ type: GET_ONLINE_STATUS, isOnline });

export const getUsersThunk = (page = 1, count = 30) => async dispatch => {
    try {
        dispatch(setLoader(true));
        const response = await usersAPI.getUsers(page, count);
        dispatch(getUsersCreator(response.data.items));
        dispatch(getTotalCount(response.data.totalCount));
        dispatch(setCurrentPage(page));
        dispatch(setLoader(false));
    } catch (error) {
        dispatch(setGlobalErrorThunk(error));
    }
}

export const follow = id => dispatch => {
    followThunk(followAPI.postFollow, id, dispatch, followCreator, setDisabled, setGlobalErrorThunk);
}

export const unfollow = id => dispatch => {
    followThunk(followAPI.deleteFollow, id, dispatch, unfollowCreator, setDisabled, setGlobalErrorThunk);
}

export const getOnlineStatusThunk = () => async dispatch => {
    const response = await onlineAPI.getOnline();
    const data = Object.keys(response.data).map(e => ({ code: response.data[e], id: e }));
    dispatch(getOnlineStatusCreator(data));
}

export const setOnlineStatusThunk = id => async dispatch => {
    await onlineAPI.setOnline(id);
    dispatch(getOnlineStatusThunk());
}

export const setOfflineStatusThunk = id => async dispatch => {
    await onlineAPI.setOffline(id);
    dispatch(getOnlineStatusThunk());
}

export default usersReducer;