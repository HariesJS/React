import React, { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import { useSelector, useDispatch } from 'react-redux';
import { getUsersThunk, follow, unfollow } from '../../redux/reducers/usersReducer/usersReducer';
import { getUsers } from './usersSelectors';
import Paginator from '../../paginator/paginator';

const Users = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => getUsers(state));
    const isDisabled = useSelector(state => state.usersPage.isDisabled);
    const isLoad = useSelector(state => state.usersPage.isLoad);
    const totalCount = useSelector(state => state.usersPage.totalCount);
    const currentPage = useSelector(state => state.usersPage.currentPage);
    const color = useSelector(state => state.theme.color);
    const data = useSelector(state => state.auth.data);

    const loadUsers = useCallback(page => dispatch(getUsersThunk(page)), [getUsersThunk])


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
                        <div>{e.name} | {e.id}</div>
                        <div align='center'>
                            <Link to={`/profile/${e.id}`}>
                                <img src={e.photos.large || userImage} alt='' width='60%' />
                            </Link>
                        </div>
                        <div>{
                            e.id === data.id
                            ? <Link to='/profile' className='button'>Мой профиль</Link>
                            : e.followed
                            ? <button className='button' disabled={isDisabled.some(id => id === e.id)} onClick={() => dispatch(unfollow(e.id))}>Отписаться</button>
                            : <button className='button' disabled={isDisabled.some(id => id === e.id)} onClick={() => dispatch(follow(e.id))}>Подписаться</button>
                        }</div>
                    </div>
                ))
            }</div>
        }
        </div>
    )
}

export default Users;