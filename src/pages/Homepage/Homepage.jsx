import React, { useState } from 'react';
import DefaultLayout from '../../components/Layouts/DefaultLayout';
import "./Homepage.scss";
import millify from "millify";
import { HiChevronDown } from "react-icons/hi"
import { AiFillStar, AiFillPieChart } from 'react-icons/ai';
import ButtonNav from '../../components/ButtonNav/ButtonNav';

import { useGetCryptosQuery, useGetStatsQuery } from '../../services/cryptoApi'
import TableCoin from '../../components/TableCoin/TableCoin';
import Pagination from '../../components/Pagination/Pagination';
import { useParams } from 'react-router';


function Homepage() {
    const [amountCoins, setAmountCoins] = useState(20);
    const [numPag, setNumPag] = useState(1);
    const { data, isFetching } = useGetStatsQuery();
    const stats = data?.data;

    const params = useParams();
    const tag = params.tag;

    const { data: dataDefault } = useGetCryptosQuery({ count: 1, timePeriod: '24h', tag: tag });

    if (isFetching) return "Loading...";
    // console.log(data)

    function showList() {
        const popupList = document.querySelector('.wrapperList');
        popupList.classList.toggle('hidden');
    }

    return (

        <DefaultLayout>
            <div className="homepageWrapper">
                {tag ? (
                    <header>
                        <h2 className="title">Top {tag} Tokens by Market Capitalization</h2>
                    </header>
                ) :
                    (<header>
                        <h2 className="title">Today's Cryptocurrency Prices by Market Cap</h2>
                        <p className="description">The global crypto market cap is <span>${millify(stats?.totalMarketCap, {
                            precision: 2
                        })}</span>.</p>
                    </header>)}
                <main>
                    <div className="nav">
                        <div className='left-nav'>
                            <ButtonNav auth impression='second' icon={<AiFillStar size={20} />} toHref="/Watchlist">
                                Watchlist
                            </ButtonNav>
                            <ButtonNav auth impression='second' icon={<AiFillPieChart size={20} />} toHref="/Portfolio">
                                Portfolio
                            </ButtonNav>
                            <div className="slash">|</div>

                            <div className="navButton">
                                <ButtonNav impression='first' toHref="/">
                                    Cryptocurrencies
                                </ButtonNav>
                                <ButtonNav toHref="/News">
                                    News
                                </ButtonNav>
                            </div>
                        </div>
                        <div className="rows">Show rows
                            <div className='numRow' onClick={showList}>{amountCoins} <HiChevronDown size='2rem' />
                                <div className="wrapperList hidden">
                                    <div className="tritangle"></div>
                                    <div className="listNum">
                                        <div className="num" onClick={() => {
                                            setAmountCoins((prev) => {
                                                if (prev !== 100) {
                                                    setNumPag(1);
                                                }
                                                return 100;
                                            });
                                        }}>100</div>
                                        <div className="num" onClick={() => {
                                            setAmountCoins((prev) => {
                                                if (prev !== 50) {
                                                    setNumPag(1);
                                                }
                                                return 50;
                                            });
                                        }}>50</div>
                                        <div className="num" onClick={() => {
                                            setAmountCoins((prev) => {
                                                if (prev !== 20) {
                                                    setNumPag(1);
                                                }
                                                return 20;
                                            });
                                        }}>20</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tableCoins">
                        <TableCoin numCoinDisplay={amountCoins} numPag={numPag} tag={tag} />
                    </div>
                    <div className="pagination">
                        <Pagination totalCoins={dataDefault?.data?.stats?.total} amountCoins={amountCoins} numPag={numPag} setNumPag={setNumPag} />
                    </div>
                </main>
            </div>
        </DefaultLayout>

    )
}

export default Homepage