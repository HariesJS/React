export const WithSetOffline = (isOnline, dispatch, data, setOfflineStatusThunk) => {
    isOnline.find(e => {
        if (e.code === data.id) {
            dispatch(setOfflineStatusThunk(e.id));
        }
    });
}