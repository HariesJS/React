export const followLogic = (state, id, bolean) => ({
    ...state, users: state.users.map(user => {
        if (user.id === id) {
            return { ...user, followed: bolean };
        }
        return user;
    })
})

export const followThunk = async (request, id, dispatch, actionCreator, setDisabled, setGlobalErrorThunk) => {
    try {
        dispatch(setDisabled(true, id));
        const response = await request(id);
        if (response.data.resultCode === 0) {
            dispatch(actionCreator(id));
        }
    } catch (error) {
        dispatch(setGlobalErrorThunk(error));
    } finally {
        dispatch(setDisabled(false, id));
    }
}
