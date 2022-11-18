import React from 'react';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <Navbar />
            <div className="child" style={{ background: "linear-gradient(#222531 0%, #22253100 413px", height: "100vh", padding: '3rem 8rem 0 8rem' }} >
                {children}
            </div>
        </div>
    )
}

export default DefaultLayout