import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import ChartDetail from '../../components/ChartDetail/ChartDetail';
import Converter from '../../components/Converter/Converter';
import DefaultLayout from '../../components/Layouts/DefaultLayout';
import NameSection from '../../components/NameSection/NameSection';
import News from '../../components/News/News';
import PriceSection from '../../components/PriceSection/PriceSection';
import StatSection from '../../components/StatSection/StatSection';
import { useGetCryptoQuery, useGetStatsQuery } from "../../services/cryptoApi";
import "./DetailCoinPage.scss";


function DetailCoinPage() {
    const params = useParams();
    const id = params.id;

    const { data, isFetching } = useGetCryptoQuery({ coinId: id, timePeriod: '24h' })
    const { data: dataStat, isFetching: isFetchingStat } = useGetStatsQuery();
    const [isNews, setIsNews] = useState(false);



    if (isFetching) return "Loading...";
    const coinDetail = data.data.coin;

    return (
        <DefaultLayout>
            <header className="headDetail">
                <div className="nameSection"><NameSection coinDetail={coinDetail} /></div>
                <div className="priceSection"><PriceSection coinDetail={coinDetail} /></div>
                <div className="statSection"><StatSection coinDetail={coinDetail} /></div>
            </header>
            <main className='mainDetail'>
                <div className="mainNavigate">
                    <div className={!isNews ? `btnNavigate active` : `btnNavigate`} onClick={() => { setIsNews(false) }}>Overview</div>
                    <div className={isNews ? `btnNavigate active` : `btnNavigate`} onClick={() => { setIsNews(true) }}>News</div>
                </div>


                <div className="mainChart">
                    {isNews ? (
                        <div className="newsDeatilWrapper">
                            <News coinDetail={coinDetail} />
                        </div>
                    ) :
                        (<div className="chartWrapper">
                            <ChartDetail coinDetail={coinDetail} />
                        </div>)}
                    <div className="rightWrapper">
                        <div className="converterWrapper">
                            <div className="converterHeader">
                                {coinDetail.symbol} to USD Converter
                            </div>
                            <Converter coinDetail={coinDetail} />
                        </div>
                        {isFetchingStat ? 'Loading...' : (
                            <div className="tableTrend">
                                <div className="tableHeader">
                                    Trending Coins and Tokens 🔥
                                </div>
                                <div className="content">
                                    {dataStat.data.bestCoins.map(item => {
                                        return (<a href={`/CoinDetail/${item.uuid}`} className="item" key={item.uuid}>
                                            <img src={item.iconUrl} alt={item.symbol} />
                                            <div className="name">{item.name}</div>
                                            <div className="symbol">{item.symbol}</div>
                                        </a>)
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>


            </main>
        </DefaultLayout>
    )
}

export default DetailCoinPage