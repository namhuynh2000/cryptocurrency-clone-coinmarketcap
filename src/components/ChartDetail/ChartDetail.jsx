import React, { useState } from 'react';
import "./ChartDetail.scss";
import Chart from '../Chart/Chart';

function ChartDetail({ coinDetail }) {
    const [timePeriod, setTimePeriod] = useState(0);

    const listPeriod = ['1D', '7D', '1M', '3M', '1Y',]

    return (
        <div className='chartDetailWrapper'>
            <div className="listPeriod">
                {listPeriod.map((time, index) => {
                    let className = 'timePeriod';
                    if (index === timePeriod)
                        className = 'timePeriod active'
                    return (
                        <div key={index} onClick={() => { setTimePeriod(index) }} className={className}>
                            {time}
                        </div>
                    )
                })}
            </div>
            <div className="lineChart">
                <Chart coinDetail={coinDetail} />
            </div>
        </div>
    )
}

export default ChartDetail