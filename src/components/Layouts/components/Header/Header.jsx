import React from 'react';
import { useGetStatsQuery } from "../../../../services/cryptoApi";
// import { signIn, logOut } from "../../../../utils/authFirebase";
// import { getUser, addUser } from "../../../../utils/firestoreFirebase";
import { setUser } from "../../../../app/reduces/userSlice";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { signInFunction, logOutFunction } from "../../../../utils/logicFirebase"

import './Header.scss';

function Header() {
    const { data, isFetching } = useGetStatsQuery();
    const stats = data?.data;
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.value);

    // function refreshPage() {
    //     window.location.reload(false);
    // }

    // async function signInFunction() {
    //     try {
    //         const result = await signIn();
    //         const user = await getUser(result.user.uid);
    //         if (!user) {
    //             const value = {
    //                 uid: result.user.uid,
    //                 displayName: result.user.displayName,
    //                 email: result.user.email,
    //                 photoURL: result.user.photoURL,
    //                 watchList: [],
    //             }
    //             await addUser(value.uid, value);
    //             dispatch(setUser(value));
    //         } else {
    //             dispatch(setUser(user));
    //         }
    //     }
    //     catch (e) {
    //         console.error(e)
    //     }
    // }

    // async function logOutFunction() {
    //     try {
    //         await logOut();
    //         dispatch(setUser({}));
    //     }
    //     catch (e) {
    //         console.error(e)
    //     }
    // }

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
                    {user?.uid ? (<div className='user'>
                        <div className='avatar'>
                            <img src={user.photoURL} alt="avatar" />
                            {user.displayName}

                        </div>
                        <div className="logoutButton content" onClick={async () => { dispatch(setUser(await logOutFunction())) }}>
                            Log Out
                        </div>
                    </div>

                    ) : (<div className="loginButton content" onClick={async () => { dispatch(setUser(await signInFunction())) }}>
                        Log In
                    </div>)}

                </div>

            </div>
        </>
    )
}

export default Header