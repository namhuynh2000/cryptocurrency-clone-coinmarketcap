import React from 'react';
import { useGetStatsQuery } from "../../../../services/cryptoApi";
import { signIn, logOut } from "../../../../utils/authFirebase";
import { setUser } from "../../../../app/reduces/userSlice";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import './Header.scss';

function Header() {
    const { data, isFetching } = useGetStatsQuery();
    const stats = data?.data;
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.value);

    console.log(user);

    function refreshPage() {
        window.location.reload(false);
    }

    async function signInFunction() {
        try {
            const result = await signIn();
            const value = {
                uid: result.uid,
                displayName: result.displayName,
                email: result.email,
                photoURL: result.photoURL,
            }
            dispatch(setUser(value));
            refreshPage();
        }
        catch (e) {
            console.error(e)
        }
    }

    async function logOutFunction() {
        try {
            await logOut();
            dispatch(setUser({}));
            // refreshPage();
        }
        catch (e) {
            console.error(e)
        }
    }

    if (isFetching) return 'Loading...';

    return (
        <>
            <div className="headerWrapper">
                <div className="container">
                    <div className="info">
                        <div className="content">Cryptos: <span>{stats.totalCoins.toLocaleString()}</span></div>
                        <div className="content">Exchanges: <span>{stats.totalExchanges.toLocaleString()}</span></div>
                        <div className="content">Market Cap: <span>${Number(stats.totalMarketCap).toLocaleString()}</span></div>
                        <div className="content">24h Vol: <span>${Number(stats.total24hVolume).toLocaleString()}</span></div>
                        <div className="content">Dominance: <span>BTC: {Math.round(stats.btcDominance * 100) / 100}%</span></div>
                    </div>
                    {user.uid ? (<div className='user'>
                        <div className='avatar'>
                            <img src={user.photoURL} alt="avatar" />
                            {user.displayName}

                        </div>
                        <div className="logoutButton content" onClick={logOutFunction}>
                            Log Out
                        </div>
                    </div>

                    ) : (<div className="loginButton content" onClick={signInFunction}>
                        Log In
                    </div>)}

                </div>

            </div>
        </>
    )
}

export default Header