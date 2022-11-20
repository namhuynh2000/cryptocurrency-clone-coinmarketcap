import React from 'react';
import { useParams } from "react-router-dom";
import DefaultLayout from '../../components/Layouts/DefaultLayout';
import NameSection from '../../components/NameSection/NameSection';
import PriceSection from '../../components/PriceSection/PriceSection';
import StatSection from '../../components/StatSection/StatSection';
import { useGetCryptoQuery } from "../../services/cryptoApi";
import "./DetailCoin.scss"

function DetailCoin() {
    const params = useParams();
    const id = params.id;
    // console.log(id)

    const { data, isFetching } = useGetCryptoQuery({ coinId: id, timePeriod: '24h' })

    if (isFetching) return "Loading...";
    const coinDetail = data.data.coin;

    return (
        <DefaultLayout>
            <main className="innerDetail">
                <div className="nameSection"><NameSection coinDetail={coinDetail} /></div>
                <div className="priceSection"><PriceSection coinDetail={coinDetail} /></div>
                <div className="statSection"><StatSection coinDetail={coinDetail} /></div>
            </main>
        </DefaultLayout>
    )
}

export default DetailCoin