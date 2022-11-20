import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts';
import { useGetCryptoHistoryQuery } from '../../services/cryptoApi';

function Chart({ coinDetail }) {
    const { data: coinHistory, isFetching, refetch } = useGetCryptoHistoryQuery({ coinId: coinDetail.uuid, timePeriod: '24h' })

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
        coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp * 1000).toLocaleTimeString());
        // coinTimestamp.push(coinHistory?.data?.history[i].timestamp);
        console.log(coinTimestamp[i])
    }

    const data = coinPrice.map((coin, index) => {
        return { name: coinTimestamp[index], price: coin }
    })

    const reverseData = data.reverse();

    // const data = [{ name: 'Page A', price: 400 }, { name: 'Page A', price: 400 }];


    return (

        <LineChart width={700} height={300} data={reverseData}>
            <XAxis dataKey="name" />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <ReferenceLine y={coinDetail.price} stroke="var(--text-secondary-color)" strokeDasharray="2" />
            {/* <Legend /> */}
            <Line type="monotone" dataKey="price" stroke="var(--text-up-color)" dot={<></>} />
        </LineChart>

    )
}

export default Chart

