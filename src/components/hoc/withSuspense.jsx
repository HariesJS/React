import React from 'react';

export const WithSuspense = Component => () => (
    <React.Suspense fallback={<b>SUSPENSE...</b>}><Component /></React.Suspense>
)