import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useGetCryptoHistoryQuery } from '../../services/cryptoApi';

function Chart({ coinId }) {
    const { data: coinHistory, isFetching, refetch } = useGetCryptoHistoryQuery({ coinId: coinId, timePeriod: '7d' })

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
        coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
    }

    const data = coinPrice.map((coin, index) => {
        return { name: coinTimestamp[index], price: coin }
    })

    const reverseData = data.reverse();

    // const data = [{ name: 'Page A', price: 400 }, { name: 'Page A', price: 400 }];

    return (
        <ResponsiveContainer width="100%" height={82}>
            <LineChart width={100} height={82} data={reverseData}>
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                {/* <XAxis dataKey="name" /> */}
                <YAxis hide={true} domain={['dataMin', 'dataMax']} />
                {/* <Tooltip /> */}
                {/* <Legend /> */}
                <Line type="monotone" dataKey="price" stroke="#8884d8" dot={<></>} />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default Chart


// import React from 'react';
// import { Line } from "react-chartjs-2";
// import { Chart as ChartJS } from 'chart.js/auto';
// import { useGetCryptoHistoryQuery } from '../../services/cryptoApi'

// function LineChart({ coinID }) {
//     const { data: coinHistory, isFetching } = useGetCryptoHistoryQuery({ coinId: 'Qwsogvtv82FCd', timePeriod: '24h' })

//     if (isFetching) return "Loading...";
//     console.log(coinHistory)

//     const coinPrice = [];
//     const coinTimestamp = [];

//     for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
//         coinPrice.push(coinHistory?.data?.history[i].price);
//     }

//     for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
//         coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
//     }

//     const dataCoin = {
//         labels: coinTimestamp,
//         datasets: [{
//             label: "Users Gained",
//             data: coinPrice,
//             radius: 0,
//             borderWidth: 2,
//             borderColor: '#16C784',
//             backgroundColor: '#fff',
//             hoverRadius: 6,
//             hoverBorderWidth: 3,
//             // hitRadius: 300,
//             borderJoinStyle: 'bevel',
//         }],
//         scales: {
//             display: false,
//         }
//     }

//     const options = {
//         scales: {
//             display: false,
//         }
//     }


//     return (
//         <>
//             <Line data={dataCoin} options={options} />
//         </>
//     )
// }

// export default LineChart