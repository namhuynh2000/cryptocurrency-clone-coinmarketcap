import React from 'react';
import './ButtonNav.scss';
import { Link } from "react-router-dom"


function ButtonNav({ impression, children, icon, toHref }) {
    return (
        <>
            <div className="buttonNavWrapper">
                <Link to={toHref} className={`${impression}`}>
                    {icon ? <div className="icon">{icon}</div> : null}
                    {children}</Link>
            </div>
        </>
    )
}

export default ButtonNav