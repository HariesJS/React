export const getProfileData = state => {
    return state.profilePage.profile;
}

export const getProfileStatus = state => {
    return state.profilePage.status;
}

export const getProfileIsAdmin = state => {
    return state.profilePage.isAdmin;
}

export const getProfileIsTechAdmin = state => {
    return state.profilePage.isTechAdmin;
}