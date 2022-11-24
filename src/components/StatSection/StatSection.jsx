import React from 'react';
import "./StatSection.scss"

function StatSection({ coinDetail }) {

    return (
        <div className='statSectionWrapper'>
            <div className="statsBlock" style={{ paddingLeft: '0' }}>
                <div className="statLabel">Market Cap</div>
                <div className="resulDisplay">${Number(coinDetail.marketCap).toLocaleString()}</div>
                <div className="statLabel" style={{ marginTop: '2.8rem' }}>24h Volume/Market Cap <span>{(coinDetail['24hVolume'] / coinDetail.marketCap).toFixed(4)}</span></div>
            </div>
            <div className="statsBlock">
                <div className="statLabel">Fully Diluted Market Cap</div>
                <div className="resulDisplay">${Number(coinDetail.fullyDilutedMarketCap).toLocaleString()}</div>
            </div>
            <div className="statsBlock">
                <div className="statLabel">
                    <div className="volume">
                        Volume</div>
                    <div className="btn24h">24h</div></div>
                <div className="resulDisplay">${Number(coinDetail['24hVolume']).toLocaleString()}</div>
            </div>
            <div className="statsBlock">
                <div className="statLabel">
                    Circulating Supply
                </div>
                <div className="resulDisplay">{Number(coinDetail.supply.circulating).toLocaleString()} {coinDetail.symbol}</div>
                <div className="statLabel" style={{ marginTop: '2.8rem' }}>Max Supply {coinDetail.supply.max ? <span>{Number(coinDetail.supply.max).toLocaleString()} </span> : <span>--</span>}</div>
                <div className="statLabel" >Total Supply <span>{Number(coinDetail.supply.total).toLocaleString()}</span></div>
            </div>
        </div>
    )
}

export default StatSection