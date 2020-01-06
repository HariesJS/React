import React, { useState, Fragment } from 'react';
import '../../App.css';
import ProfileDataForm from './ProfileDataForm';
import ProfileStatus from './ProfileStatus';

const Profile = ({ profile, isOwner, putImageThunk, putProfileThunk, status, ...props }) => {
    const [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <div className='users-loader'></div>
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
            <div className='profile-page'>
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
            </div>
        </Fragment>
    )
}

const ProfileData = ({ isOwner, onClick, profile: { contacts, aboutMe, lookingForAJob, lookingForAJobDescription } }) => {
    return (
        <Fragment>
            {isOwner && <div className='edit-button'>
                <button onClick={onClick}>EDIT</button>
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
                    <div key={e}>{contacts[e] && <><b>{e}:</b> {contacts[e]}</>}</div>
                ))
            }</div>
        </Fragment>
    )
}

export default Profile;