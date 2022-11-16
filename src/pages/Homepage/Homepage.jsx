import React from 'react';
import DefaultLayout from '../../components/Layouts/DefaultLayout';
import "./Homepage.scss";
import millify from "millify";
import { AiFillStar, AiFillPieChart } from 'react-icons/ai';
import ButtonNav from '../../components/ButtonNav/ButtonNav';

import { useGetStatsQuery } from '../../services/cryptoApi'
import TableCoin from '../../components/TableCoin/TableCoin';

function Homepage() {


    const { data, isFetching } = useGetStatsQuery();
    const stats = data?.data;

    if (isFetching) return "Loading..."

    return (
        <>
            <DefaultLayout>
                <div className="homepageWrapper">
                    <header>
                        <h2 className="title">Today's Cryptocurrency Prices by Market Cap</h2>
                        <p className="description">The global crypto market cap is <span>${millify(stats?.totalMarketCap, {
                            precision: 2
                        })}</span>.</p>
                    </header>
                    <main>
                        <div className="nav">
                            <ButtonNav impression='second' icon={<AiFillStar size={20} />} toHref="/Watchlist">
                                Watchlist
                            </ButtonNav>
                            <ButtonNav impression='second' icon={<AiFillPieChart size={20} />} toHref="/Portfolio">
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
                        <div className="tableCoins">
                            <TableCoin />
                        </div>
                    </main>
                </div>
            </DefaultLayout>
        </>
    )
}

export default Homepage