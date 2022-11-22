import React, { useEffect, useRef, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, Brush, Label, ReferenceLine } from 'recharts';
import { useGetCryptoHistoryQuery } from '../../services/cryptoApi';
import { openFullscreen } from "../../utils/logicHandle";
import { priceConvert } from "../../utils/logicHandle";
import { AiOutlineExpand } from "react-icons/ai";
import { convertTime, convertDate } from '../../utils/logicHandle';
import moment from 'moment/moment';
import "./ChartDetail.scss";


function ChartDetail({ coinDetail }) {
    const [timePeriod, setTimePeriod] = useState(0);
    const listPeriod = ['1D', '7D', '1M', '3M', '1Y', '3Y'];
    const listPeriodConvert = ['24h', '7d', '30d', '3m', '1y', '3y'];
    const listFormat = ['kk:mm', 'Do MMM', 'Do MMM', 'Do MMM', 'MMM YY', 'MMM YY'];
    // const listTickGap = [60, 60, 60, 60, 60];

    const chartRef = useRef(null);
    const { data: coinHistory, isFetching, refetch } = useGetCryptoHistoryQuery({ coinId: coinDetail?.uuid, timePeriod: listPeriodConvert[timePeriod] });
    const [settingChart, setSettingChart] = useState({
        width: 900,
        height: 400,
        margin: { top: 5, right: 75, bottom: 5, left: 40 }
    })
    const strokeColor = coinDetail?.change < 0 ? "var(--text-down-color)" : "var(--text-up-color)";

    function exitHandler() {
        if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            setSettingChart(
                {
                    width: 900,
                    height: 400,
                    margin: { top: 5, right: 75, bottom: 5, left: 40 }
                }
            )
        }
    }

    useEffect(() => {
        document.addEventListener('fullscreenchange', exitHandler, false);
        document.addEventListener('mozfullscreenchange', exitHandler, false);
        document.addEventListener('MSFullscreenChange', exitHandler, false);
        document.addEventListener('webkitfullscreenchange', exitHandler, false);
    }, [])

    if (isFetching) return "Loading...";

    // if (coinHistory === undefined) {
    //     refetch();
    // }

    const coinPrice = [];
    const coinTimestamp = [];

    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinPrice.push(coinHistory?.data?.history[i].price);
    }

    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinTimestamp.push(coinHistory?.data?.history[i].timestamp);
    }

    const data = coinPrice.map((coin, index) => {
        return { TimeLabel: moment(coinTimestamp[index] * 1000).format(listFormat[timePeriod]), time: coinTimestamp[index], price: Number(coin), timeConvert: convertDate(coinTimestamp[index]) }
    })

    const reverseData = data.reverse();

    // const data = [{ name: 'Page A', price: 400 }, { name: 'Page A', price: 400 }];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <div className="intro">
                        <div className="date">{convertDate(payload[0]?.payload?.time)}</div>
                        <div className="time">{convertTime(payload[0]?.payload?.time)}</div>
                    </div>
                    <div className="label">
                        <span>Price: </span>
                        {`$${priceConvert(payload[0].value)}`}</div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className='chartDetailWrapper' >
            <div className="headingChart">
                <div className="expandBtn" onClick={() => {
                    setSettingChart(
                        {
                            width: 1400,
                            height: 800,
                            margin: { top: 50, right: 150, bottom: 50, left: 150 }
                        }
                    )
                    openFullscreen(chartRef.current)
                }} >
                    <AiOutlineExpand />
                </div>
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
            </div>

            <div ref={chartRef}>
                <LineChart margin={settingChart.margin} className='lineChart' width={settingChart.width} height={settingChart.height} data={reverseData}>
                    <Brush dataKey="TimeLabel" fill='var(--bg-button-blue-color)' style={{ fillOpacity: 0.2 }} />
                    <XAxis dataKey="TimeLabel" minTickGap={60} />
                    <YAxis padding={{ top: 30, bottom: 10 }} dataKey="price" type="number" domain={['auto', 'auto']}>
                        <Label fill='#fff' value="USD" position="insideTop" />
                    </YAxis>
                    {/* label={{ value: 'Index', dy: 30, position: 'insideBottom' }}
                     */}
                    <Tooltip content={<CustomTooltip />} />
                    {/* <Legend /> */}
                    <Line type="monotone" dataKey="price" strokeWidth="2" stroke={strokeColor} dot={<></>} />
                    <ReferenceLine y={reverseData[0].price} stroke="var(--text-secondary-color)" strokeDasharray="2">
                        <Label fill='#fff' >
                            {priceConvert(reverseData[0].price)}
                        </Label>
                    </ReferenceLine>
                </LineChart>

            </div>
        </div>

    )
}

export default ChartDetail

