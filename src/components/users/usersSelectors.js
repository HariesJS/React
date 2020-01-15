import { createSelector } from 'reselect';

const getUsersSelector = state => {
    return state.usersPage.users;
}

export const getUsersData = createSelector(getUsersSelector, users => {
    return users.filter(() => true);
});

export const getUsersIsDisabled = state => {
    return state.usersPage.isDisabled;
}

export const getUsersIsLoad = state => {
    return state.usersPage.isLoad;
}

export const getUsersTotalCount = state => {
    return state.usersPage.totalCount;
}

export const getUsersCurrentPage = state => {
    return state.usersPage.currentPage;
}

export const getUsersIsOnline = state => {
    return state.usersPage.isOnline;
}