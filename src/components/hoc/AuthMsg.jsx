import React from 'react';
import '../../App.css';

const AuthMsg = ({ children }) => (
    <div className='authorized-message'>
        {children}
    </div>
)

export default AuthMsg;