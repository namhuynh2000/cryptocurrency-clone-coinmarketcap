import React from 'react';
import './ButtonNav.scss';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';

function ButtonNav({ impression, children, icon, toHref, auth = false }) {
    const user = useSelector(state => state.user.value);

    function checkAuth(e) {
        if (auth && !user.uid) {
            e.preventDefault();
            toast.warn("Login to use this feature!");
        }
        else {
            if (toHref === '/Portfolio') {
                e.preventDefault();
                toast("Coming soon!");
            }
        }
    }
    return (
        <>
            <div className="buttonNavWrapper">
                <Link onClick={checkAuth} to={toHref} className={`${impression}`}>
                    {icon ? <div className="icon">{icon}</div> : null}
                    {children}</Link>
            </div>
        </>
    )
}

export default ButtonNav