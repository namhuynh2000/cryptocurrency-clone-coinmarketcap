import React from 'react';
import './ButtonNav.scss';
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";


function ButtonNav({ impression, children, icon, toHref }) {
    // const user = useSelector((state) => state.user.value);
    // if (!user.uid) {
    //     toHref = "/";
    // }
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