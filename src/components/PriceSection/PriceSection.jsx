import React, { useEffect, useState } from 'react';
import "./PriceSection.scss";
import { priceConvert } from "../../utils/logicHandle";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { useGetCryptoRefetchQuery } from '../../services/cryptoApi';


function PriceSection({ coinDetail }) {
    const { data, refetch } = useGetCryptoRefetchQuery(coinDetail.uuid);

    const [loop, setLoop] = useState(false);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         refetch();
    //         setLoop(!loop);
    //     }, 3000);
    //     return () => {
    //         clearInterval(interval);
    //     };
    // }, [loop, refetch]);


    return (
        <div className='priceSectionWrapper'>
            <div className="priceHeading">{data?.data.coin.name} Price ({data?.data.coin.symbol})</div>
            <div className="price">
                <span>${priceConvert(data?.data.coin.price)}</span>
                {data?.data.coin.change < 0 ? (<div className="changeDownBtn"><BsFillCaretDownFill />{Math.abs(data?.data.coin.change)}%</div>) : (<div className="changeUpBtn"><BsFillCaretUpFill />{data?.data.coin.change}%</div>)}
            </div>
            <div className="convertBTC">{priceConvert(Number(data?.data.coin.btcPrice).toFixed(80))} BTC</div>
        </div>
    )
}

export default PriceSection