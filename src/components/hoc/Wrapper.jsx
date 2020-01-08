import React from 'react';
import { useSelector } from 'react-redux';
import '../../App.css';

const Wrapper = ({ children }) => {
    const color = useSelector(state => state.theme.color);

    return (
        <div className='wrapper-profile'>
            <div style={{ backgroundColor: color }} className='profile-page'>
                {children}
            </div>
        </div>
    )
}

export default Wrapper;