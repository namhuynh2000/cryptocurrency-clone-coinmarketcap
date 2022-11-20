import React from 'react';
import "./PriceSection.scss";
import { priceConvert } from "../../utils/logicHandle";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";


function PriceSection({ coinDetail }) {

    return (
        <div className='priceSectionWrapper'>
            <div className="priceHeading">{coinDetail.name} Price ({coinDetail.symbol})</div>
            <div className="price">
                <span>${priceConvert(coinDetail.price)}</span>
                {coinDetail.change < 0 ? (<div className="changeDownBtn"><BsFillCaretDownFill />{Math.abs(coinDetail.change)}%</div>) : (<div className="changeUpBtn"><BsFillCaretUpFill />{coinDetail.change}%</div>)}

            </div>
        </div>
    )
}

export default PriceSection