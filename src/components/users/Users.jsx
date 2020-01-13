import React, { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import { useSelector, useDispatch } from 'react-redux';
import { getUsersThunk, follow, unfollow } from '../../redux/reducers/usersReducer/usersReducer';
import { getUsersData, getUsersIsDisabled, getUsersIsLoad, getUsersTotalCount, getUsersCurrentPage } from './usersSelectors';
import Paginator from '../../paginator/paginator';
import { getThemeColor } from '../theme/themeSelectors';
import { getAuthData } from '../auth/authSelectors';
import { getProfileIsTechAdmin, getProfileIsAdmin } from '../profile/profileSelectors';

const Users = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => getUsersData(state));
    const isDisabled = useSelector(state => getUsersIsDisabled(state));
    const isLoad = useSelector(state => getUsersIsLoad(state));
    const totalCount = useSelector(state => getUsersTotalCount(state));
    const currentPage = useSelector(state => getUsersCurrentPage(state));
    const color = useSelector(state => getThemeColor(state));
    const data = useSelector(state => getAuthData(state));
    const isTechAdmin = useSelector(state => getProfileIsTechAdmin(state));
    const isAdmin = useSelector(state => getProfileIsAdmin(state));

    const loadUsers = useCallback(page => dispatch(getUsersThunk(page)), [getUsersThunk]);


    useEffect(() => {
        loadUsers();
    }, []);

    const changePage = page => {
        loadUsers(page);
    }

    const userImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png';
    return (
        <div className='users-wrapper'>
            <span className='users-title'>All users of this site</span>
            <Paginator totalCount={totalCount} currentPage={currentPage} changePage={changePage} />
            {isLoad
            ? <div className='users-loader'>LOADING...</div>
            : <div className='parrent-block'>{
                users.map(e => (
                    <div style={{ backgroundColor: color }} className='user-block' key={e.id}>
                        {isTechAdmin.some(id => id.code === e.id)
                        ? <div className='profile-techadmin-info'>{e.name} | {e.id}</div>
                        : !isAdmin.some(id => id.code === e.id)
                        ? <div>{e.name} | {e.id}</div>
                        : <div className='profile-admin-info'>{e.name} | {e.id}</div>}
                        <div align='center'>
                            <Link to={`/profile/${e.id}`}>
                                <img src={e.photos.large || userImage} alt='' width='60%' />
                            </Link>
                        </div>
                        <div>{
                            data.isAuth
                            ? e.id === data.id
                            ? <Link to='/profile' className='button'>Мой профиль</Link>
                            : e.followed
                            ? <button className='button' disabled={isDisabled.some(id => id === e.id)} onClick={() => dispatch(unfollow(e.id))}>Отписаться</button>
                            : <button className='button' disabled={isDisabled.some(id => id === e.id)} onClick={() => dispatch(follow(e.id))}>Подписаться</button>
                            : <Link to='/login' className='button'>Войдите</Link>
                        }</div>
                    </div>
                ))
            }</div>
        }
        </div>
    )
}

export default Users;