import React from 'react';
import { useGetStatsQuery } from "../../../../services/cryptoApi";

import './Header.scss';

function Header() {
    const { data, isFetching } = useGetStatsQuery();
    const stats = data?.data;

    if (isFetching) return '';

    return (
        <>
            <div className="headerWrapper">
                <div className="container">
                    <div className="content">Cryptos: <span>{stats.totalCoins.toLocaleString()}</span></div>
                    <div className="content">Exchanges: <span>{stats.totalExchanges.toLocaleString()}</span></div>
                    <div className="content">Market Cap: <span>${Number(stats.totalMarketCap).toLocaleString()}</span></div>
                    <div className="content">24h Vol: <span>${Number(stats.total24hVolume).toLocaleString()}</span></div>
                    <div className="content">Dominance: <span>BTC: {Math.round(stats.btcDominance * 100) / 100}%</span></div>
                </div>
            </div>
        </>
    )
}

export default Header