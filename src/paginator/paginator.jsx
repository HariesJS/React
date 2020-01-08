import React, { useEffect, Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import '../App.css';

const Paginator = ({ totalCount, currentPage, changePage }) => {
    const color = useSelector(state => state.theme.color);
    const [port, setPort] = useState(10);

    useEffect(() => {
        if (window.innerWidth < 500) {
            setWidth();
        }
        function setWidth() {
            if (window.innerWidth < 500) {
                setPort(5);
            } else {
                setPort(10);
            }
        }
        window.addEventListener('resize', setWidth);
        return () => window.removeEventListener('resize', setWidth);
    }, []);

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
                portion > 1 && <span onClick={() => setPortion(portion - 1)} style={{ borderColor: color }} className='paginator'>{'<'}</span>
            }{
                pages.filter(e => e >= left && e <= right).map(e => (
                    <div style={{ borderColor: color }, currentPage === e ? { backgroundColor: color, borderColor: color } : { borderColor: color }} className={currentPage === e ? 'paginator-active' : 'paginator'} onClick={() => updatePage(e)} key={e}>
                        <span>{e}</span>
                    </div>
                ))
            }{
                portion < portSize && <span onClick={() => setPortion(portion + 1)} style={{ borderColor: color }} className='paginator'>{'>'}</span>
            }</div>
        </Fragment>
    )
}

export default Paginator;