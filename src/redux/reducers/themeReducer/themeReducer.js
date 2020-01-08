const SET_COLOR = 'my-app/themeReducer/SET-COLOR';

const initialState = {
    color: '#3959ab'
}

const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COLOR: return { ...state, color: action.color };
        default: return state;
    }
}

export const setThemeColorCreator = color => ({ type: SET_COLOR, color });

export default themeReducer;