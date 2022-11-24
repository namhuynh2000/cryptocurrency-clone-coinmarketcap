import moment from 'moment/moment';
import React, { useState } from 'react';
import { useGetNewsQuery } from '../../services/newsApi';
import "./News.scss"

function News({ coinDetail }) {
    let category = 'Cryptocurrency';
    if (coinDetail) {
        category = `Cryptocurrency ${coinDetail?.name}`;
    }
    const [count, setCount] = useState(5);
    const { data: newsData, isFetching, refetch } = useGetNewsQuery({ newsCategory: category, count: count });

    // if (isFetching) return "Loading...";

    return (
        <div className='newsWrapper'>
            <div className="newsHeader">
                Latest News
            </div>
            {newsData?.value.map((news, index) => {
                return (
                    <a key={index} href={news.url} className='news'>
                        <div className="content">
                            <div className="newsTitle">
                                {news.name}
                            </div>
                            <div className="datePublished">{
                                moment(news.datePublished).format('MMMM Do YYYY, h:mm:ss a')}</div>
                            <div className="newsDescription">{news.description}</div>
                        </div>
                        <div className="image">
                            <img src={news.image?.thumbnail.contentUrl ? news.image.thumbnail.contentUrl : '/noimage.png'} alt="" />
                        </div>
                    </a>
                )
            })}
            <div className="loadBtn" onClick={() => {
                setCount(count + 5);
                refetch();
            }}>
                Load More
            </div>
        </div>
    )
}

export default News