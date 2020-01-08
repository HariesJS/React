import React from 'react';
import { reduxForm } from 'redux-form';
import { createFiled, Input, Textarea } from '../../redux/reduxForm/formsControl';
import '../../App.css';

const ProfileDataForm = ({ handleSubmit, profile: { contacts }, error }) => (
    <form onSubmit={handleSubmit}>
        {error && <h2>{error}</h2>}
        <div className='profile-form'>
            <div><b>ABOUT ME:</b> <div className='edit-button'>
                <button className='button'>SAVE</button>
            </div> <div>{createFiled(Textarea, 'aboutMe', [])}</div></div>
            <div><b>SEARCH JOB:</b> {createFiled(Input, 'lookingForAJob', [], 'checkbox')}</div>
            <div><b>MY SKILLS:</b> <div>{createFiled(Textarea, 'lookingForAJobDescription', [])}</div></div>
        </div>
        <div>
            <hr color='white' />
            <b>SOCIAL NETWORKS</b>
            <hr color='white' />
        </div>
        <div>{
            Object.keys(contacts).map(e => (
                <div className='profile-field' key={e}>
                    <b className='profile-networks'>{e}:</b> 
                    <span>
                        {createFiled(Input, `contacts.${e}`, [])}
                    </span>
                </div>
            ))
        }</div>
    </form>
);

export default reduxForm({ form: 'profilepage' })(ProfileDataForm);