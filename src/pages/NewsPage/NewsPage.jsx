import React from 'react';
import DefaultLayout from '../../components/Layouts/DefaultLayout';
import News from '../../components/News/News';
import "./NewsPage.scss";

function NewsPage() {
    return (
        <DefaultLayout>
            <div><News /></div>
        </DefaultLayout>
    )
}

export default NewsPage