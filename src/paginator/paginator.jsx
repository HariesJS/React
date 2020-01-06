import React, { Fragment, useState } from 'react';
import '../App.css';

const Paginator = ({ totalCount, currentPage, changePage, port = 10 }) => {
    const pages = [];

    const portCount = Math.ceil(totalCount / 30);

    for (let i = 1; i <= portCount; i++) {
        pages.push(i);
    }

    const portSize = Math.ceil(portCount / port);
    
    const [portion, setPortion] = useState(1);
    const left = (portion - 1) * port + 1;
    const right = portion * port;
    
    const updatePage = e => {
        if (e !== currentPage) {
            changePage(e);
        }
    }
    return (
        <Fragment>
            <div>{
                portion > 1 && <span onClick={() => setPortion(portion - 1)} className='paginator'>{'<'}</span>
            }{
                pages.filter(e => e >= left && e <= right).map(e => (
                    <div onClick={() => updatePage(e)} key={e} className={currentPage === e ? 'paginator-active' : 'paginator'}>
                        <span>{e}</span>
                    </div>
                ))
            }{
                portion < portSize && <span onClick={() => setPortion(portion + 1)} className='paginator'>{'>'}</span>
            }</div>
        </Fragment>
    )
}

export default Paginator;