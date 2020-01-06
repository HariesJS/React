import React, { Fragment, useState, useEffect } from 'react';

const ProfileStatus = ({ status, isOwner, putStatusThunk }) => {
    const [editMode, setEditMode] = useState(false);
    const [value, setValue] = useState(status);

    useEffect(() => {
        setValue(status);
    }, [status]);

    const activateEditMode = () => {
        if (isOwner) {
            setEditMode(true);
        }
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        putStatusThunk(value);
    }

    const changeStatus = e => {
        setValue(e.target.value);
    }
    return (
        <Fragment>{
            editMode
            ? <input onChange={changeStatus} onBlur={deactivateEditMode} value={value} maxLength={19} autoFocus={true} />
            : <span onClick={activateEditMode}>{value || '----'}</span>
        }</Fragment>
    )
}

export default ProfileStatus;