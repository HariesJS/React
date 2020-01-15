export const WithSetOnline = (isOnline, dispatch, data, setOnlineStatusThunk) => {
    if (isOnline.length) {
        !isOnline.find(({ code }) => code === data.id)
        && dispatch(setOnlineStatusThunk(data.id));
    }
}