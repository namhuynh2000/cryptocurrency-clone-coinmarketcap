import React from 'react';
import { useGetCryptosQuery } from '../../services/cryptoApi';
import "./TableCoin.scss";
import { BiStar } from "react-icons/bi";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from "../../utils/firestoreFirebase";
import { setUser } from "../../app/reduces/userSlice"



function TableCoin() {
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();
    const { data: dataDefault } = useGetCryptosQuery({ count: 100, time: '24h' });
    const { data: dataOneHours } = useGetCryptosQuery({ count: 100, time: '1h' });
    const { data: dataSevenDays } = useGetCryptosQuery({ count: 100, time: '7d' });
    // const { data } = useGetCryptosQuery({ count: 10, time: '3m' });

    // if (isFetching) return "Loading...";
    const coins = dataDefault?.data?.coins;

    const coinsConfig = coins?.map((coin, index) => {
        if (coin.price >= 0.005)
            return { ...coin, price: Number(Number(coin.price).toFixed(4)).toLocaleString(undefined, { maximumFractionDigits: 4, minimumFractionDigits: 2 }), changeOneHours: dataOneHours?.data?.coins[index].change, changeSevenDays: dataSevenDays?.data?.coins[index].change }
        else {
            let numfix = 0;
            for (let num of coin.price) {
                if (num === '0' || num === '.') {
                    numfix++;
                }
                else {
                    break;
                }
            }
            return { ...coin, price: Number(coin.price).toFixed(numfix + 2), changeOneHours: dataOneHours?.data?.coins[index].change, changeSevenDays: dataSevenDays?.data?.coins[index].change }
        }
    });

    async function updateWatchList(id, data) {
        if (user.uid) {
            let newWatchList = []
            if (user.watchList.includes(data)) {
                newWatchList = user.watchList.filter(item => item !== data);
            }
            else {
                newWatchList = [...user.watchList, data];
            }
            dispatch(setUser({ ...user, watchList: newWatchList }))
            await updateUser(id, { watchList: newWatchList });
        }
    }

    return (
        <>
            <table cellSpacing="0" cellPadding="0" style={{ width: '100%' }} className='tableCoinWrapper'>
                <thead>
                    <tr>
                        <th></th>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>1h %</th>
                        <th>24h %</th>
                        <th>7d %</th>
                        <th>Market Cap</th>
                        <th>Volume(24h)</th>
                        <th style={{ width: '20%' }}>Last 7 Days</th>
                    </tr>
                </thead>
                <tbody>
                    {coinsConfig?.map(coin => {
                        return (<tr key={coin.uuid}>
                            <td className='starIcon'>
                                {user?.watchList?.includes(coin.uuid) ?
                                    <AiFillStar onClick={() => { updateWatchList(user?.uid, coin.uuid) }} size={17} color='#ffd900' /> :
                                    <BiStar onClick={() => { updateWatchList(user?.uid, coin.uuid) }} size={17} color='#A1A7BB' />}</td>
                            <td className='center'>{coin.rank}</td>
                            <td className='name'>
                                <Link to={`/CoinDetail/${coin.uuid}`}>
                                    <img src={coin.iconUrl} alt={`logo ${coin.name}`} /><span>{coin.name}</span> {coin.symbol}
                                </Link>
                            </td>
                            <td className='center'>
                                <Link to={`/CoinDetail/${coin.uuid}`}>
                                    ${coin.price}
                                </Link>
                            </td>
                            {coin.changeOneHours < 0 ?
                                (<td className='changeDown center'><BsFillCaretDownFill size={12} />{Math.abs(coin.changeOneHours)}%</td>)
                                : (<td className='changeUp center'><BsFillCaretUpFill size={12} />{Math.abs(coin.changeOneHours)}%</td>)}
                            {coin.change < 0 ?
                                (<td className='changeDown center'><BsFillCaretDownFill size={12} />{Math.abs(coin.change)}%</td>)
                                : (<td className='changeUp center'><BsFillCaretUpFill size={12} />{Math.abs(coin.change)}%</td>)}
                            {coin.changeSevenDays < 0 ?
                                (<td className='changeDown center'><BsFillCaretDownFill size={12} />{Math.abs(coin.changeSevenDays)}%</td>)
                                : (<td className='changeUp center'><BsFillCaretUpFill size={12} />{Math.abs(coin.changeSevenDays)}%</td>)}
                            <td className='center'>${Number(coin.marketCap).toLocaleString()}</td>
                            <td className='center'>${Number(coin['24hVolume']).toLocaleString()}</td>
                        </tr>)
                    })}
                </tbody>


            </table>
        </>
    )
}

export default TableCoin