import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../App.css';
import { setThemeColorCreator } from '../../redux/reducers/themeReducer/themeReducer';

const Button = ({ children }) => {
    const dispatch = useDispatch();

    const changeTheme = e => {
        if (e.target.innerHTML === 'Blue') {
            return dispatch(setThemeColorCreator('#3959ab'));
        } else {
            return dispatch(setThemeColorCreator(e.target.innerText));
        }
    }
    return <div onClick={changeTheme} className='theme-button'>{children}</div>
}

const Theme = () => {
    const color = useSelector(state => state.theme.color);

    return (
        <div style={{ backgroundColor: color }} className='theme-colors'>
            <Button>Blue</Button>
            <Button>Green</Button>
            <Button>Orange</Button>
            <Button>Red</Button>
        </div>
    )
}

export default Theme;