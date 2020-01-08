import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../App.css';
import ProfileDataForm from './ProfileDataForm';
import ProfileStatus from './ProfileStatus';
import Wrapper from '../hoc/Wrapper';
import { getUsersThunk } from '../../redux/reducers/usersReducer/usersReducer';
import { Link } from 'react-router-dom';

const Profile = ({ profile, isOwner, putImageThunk, putProfileThunk, status, ...props }) => {
    const [editMode, setEditMode] = useState(false);
    const users = useSelector(state => state.usersPage.users);
    const dispatch = useDispatch();

    const loadUsers = useCallback(() => dispatch(getUsersThunk()), [getUsersThunk]);

    useEffect(() => {
        loadUsers();
    }, []);

    if (!profile) {
        return <div className='users-loader'>Loading...</div>
    }

    const changeImage = e => {
        if (e.target.files.length) {
            putImageThunk(e.target.files[0]);
        }
    }

    const saveProfile = e => {
        putProfileThunk(e)
        .then(() => setEditMode(false));
    }

    const userImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png';
    return (
        <Fragment>
            <Wrapper>
                <div className='profile-flex'>
                    <div className='profile-oneblock'>
                        <div className='profile-info'>{profile.fullName} | {profile.userId}</div>
                        <div><img className='profile-img' src={profile.photos.large || userImage} alt='' /></div>
                        {isOwner && <input type='file' onChange={changeImage} />}
                        <div className='profile-status'>STATUS: <ProfileStatus status={status} isOwner={isOwner} { ...props } /></div>
                    </div>
                    <div className='profile-twoblock'>
                        {!editMode
                            ? <ProfileData onClick={() => setEditMode(true)} isOwner={isOwner} profile={profile} />
                            : <ProfileDataForm onSubmit={saveProfile} initialValues={profile} profile={profile} />}
                    </div>
                    {isOwner && <div className='followers-wrapper'>
                        <span className='follow-title'>подписки</span>
                        <div className='followers-block'>
                            {users.filter(e => e.followed === true).map(({ id, name, photos, followed }) => (
                                <div key={id}>
                                    <Link className='image-wrapper' to={`/profile/${id}`}>
                                        <img className='image-user' src={photos.large || userImage} alt='' />
                                    </Link>
                                    <div className='follower-name'>{name}</div>
                                </div>
                            ))}
                            <div className='followers-info'>найти друзей можно во вкладке users</div>
                        </div>
                    </div>}
                </div>
            </Wrapper>
        </Fragment>
    )
}

const ProfileData = ({ isOwner, onClick, profile: { contacts, aboutMe, lookingForAJob, lookingForAJobDescription } }) => {
    return (
        <Fragment>
            {isOwner && <div className='edit-button'>
                <button className='button' onClick={onClick}>EDIT</button>
            </div>}
            <div><b>ABOUT ME:</b> {aboutMe && aboutMe.toString()}</div>
            <div><b>SEARCH JOB:</b> {lookingForAJob ? 'YES' : 'NO'}</div>
            <div><b>MY SKILLS:</b> {lookingForAJobDescription && lookingForAJobDescription.toString()}</div>
            <div>
                <hr color='white' />
                <b>SOCIAL NETWORKS</b>
                <hr color='white' />
            </div>
            <div>{
                Object.keys(contacts).map(e => (
                    <div key={e}>{contacts[e] && <><b className='profile-networks'>{e}:</b> {contacts[e]}</>}</div>
                ))
            }</div>
        </Fragment>
    )
}

export default Profile;