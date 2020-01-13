import React from 'react';
import { useSelector } from 'react-redux';
import '../../App.css';
import { getThemeColor } from '../theme/themeSelectors';

const Wrapper = ({ children }) => {
    const color = useSelector(state => getThemeColor(state));

    return (
        <div className='wrapper-profile'>
            <div style={{ backgroundColor: color }} className='profile-page'>
                {children}
            </div>
        </div>
    )
}

export default Wrapper;