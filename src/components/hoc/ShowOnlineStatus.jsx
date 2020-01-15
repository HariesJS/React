import React from 'react';
import { useSelector } from 'react-redux';
import '../../App.css';
import { getUsersIsOnline } from '../users/usersSelectors';

export const ShowOnlineStatus = ({ data }) => {
    const isOnline = useSelector(state => getUsersIsOnline(state));
    
    return (
        isOnline.some(({ code }) => code === data)
        ? <div className='online-block'>Online</div>
        : <div className='offline-block'>Offline</div>
    );
}