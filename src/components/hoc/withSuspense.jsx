import React from 'react';
import '../../App.css';

export const WithSuspense = Component => () => (
    <React.Suspense fallback={<div className='users-loader'>SUSPENSE LOADING...</div>}>
        <Component />
    </React.Suspense>
)