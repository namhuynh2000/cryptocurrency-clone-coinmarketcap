import React, { useState } from 'react';
import { priceConvert } from "../../utils/logicHandle"
import "./Converter.scss";

function Converter({ coinDetail }) {
    const [coinPrice, setCoinPrice] = useState(1);
    const [usdPrice, setUsdPrice] = useState(priceConvert(coinDetail.price));
    const [flexDirection, setFlexDirection] = useState('row');

    const convertFunction = function () {
        if (flexDirection === 'row-reverse') {
            setFlexDirection('row');
        }
        else {
            setFlexDirection('row-reverse');
        }
    }

    return (
        <div className='convertWrapper' style={{ flexDirection: flexDirection }}>
            <img className='convertIcon' src="https://s2.coinmarketcap.com/static/cloud/img/converter.png?_=e7587ae"
                onClick={convertFunction} alt='convertIcon' />
            <div className="coin">
                <div className="icon">
                    <img src={coinDetail.iconUrl} alt={coinDetail.symbol} />
                </div>
                <div className="info">
                    <div className="symbol">{coinDetail.symbol}</div>
                    <div className="fullName">{coinDetail.name}</div>
                </div>
                <input type="text" value={coinPrice} onChange={(e) => {
                    setCoinPrice(e.target.value);
                    setUsdPrice(priceConvert(Number(e.target.value) * coinDetail.price));
                }} />
            </div>
            <div className="usd">
                <div className="icon">
                    <img src="https://s2.coinmarketcap.com/static/cloud/img/fiat-flags/USD.svg" alt="USD icon" />
                </div>
                <div className="info">
                    <div className="symbol">USD</div>
                    <div className="fullName">United States Dollar
                    </div>
                </div>
                <input type="text" value={usdPrice} onChange={(e) => {
                    setUsdPrice(e.target.value);
                    setCoinPrice(priceConvert(e.target.value / coinDetail.price));
                }} />
            </div>
        </div>
    )
}

export default Converter