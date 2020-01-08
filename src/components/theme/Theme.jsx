import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../App.css';
import { setThemeColorCreator } from '../../redux/reducers/themeReducer/themeReducer';

const Button = ({ children }) => {
    const dispatch = useDispatch();

    const changeTheme = e => {
        localStorage.setItem('theme', '#3959ab');

        if (e.target.innerHTML === 'Blue') {
            return dispatch(setThemeColorCreator(localStorage.getItem('theme')));
        } else {
            localStorage.setItem('theme', e.target.innerText);
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