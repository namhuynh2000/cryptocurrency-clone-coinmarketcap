import React from 'react';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import ScrollBtn from './components/ScrollBtn/ScrollBtn';

function DefaultLayout({ children }) {
    return (
        <div style={{ position: 'relative' }}>
            <Header />
            <Navbar />
            <div className="child" style={{ background: "linear-gradient(#222531 0%, #22253100 413px", padding: '3rem 8rem 0 8rem' }} >
                {children}
            </div>
            <ScrollBtn />
        </div>
    )
}

export default DefaultLayout