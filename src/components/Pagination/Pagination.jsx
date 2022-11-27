import React from 'react';
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

import "./Pagination.scss"

function Pagination({ totalCoins, setNumPag, numPag, amountCoins }) {
    const pagEnd = Math.ceil(totalCoins / amountCoins); //1
    const listPage = [];

    let startPage = numPag - 2; // -1
    let endPage = numPag + 2; //3

    while (endPage >= pagEnd) {
        endPage--; //0
        if (startPage > 2) { //-1
            startPage--;
        }
    }
    while (startPage <= 1) {
        startPage++; //2
        if (endPage < pagEnd - 1) {
            endPage++;
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        listPage.push(i);
    }

    // const [itemOffset, setItemOffset] = useState(0);


    return (
        <div className='paginationWrapper'>
            Showing {(numPag - 1) * amountCoins + 1} - {numPag * amountCoins} out of {totalCoins}
            <div className="mainPagination" style={{ color: "#fff" }}>
                <GrFormPrevious onClick={() => {
                    if (numPag > 1) {
                        setNumPag((prev) => { return --prev; });
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                }} />
                <div onClick={() => {
                    if (numPag !== 1) {
                        setNumPag(1);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                }} className={numPag === 1 ? `PagBtn active` : `PagBtn`}>1</div>
                {numPag - 1 > 3 ? <HiOutlineDotsHorizontal /> : null}
                {listPage.map(page => {
                    return <div onClick={() => {
                        if (page !== numPag) {
                            setNumPag(page);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                    }} className={numPag === page ? `PagBtn active` : `PagBtn`} key={page}>{page}</div>
                })}
                {pagEnd - numPag > 3 ? <HiOutlineDotsHorizontal /> : null}
                {pagEnd !== 1 ? (<div onClick={() => {
                    if (numPag !== pagEnd) {
                        setNumPag(pagEnd);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                }} className={numPag === pagEnd ? `PagBtn active` : `PagBtn`} >{pagEnd}</div>) : null
                }
                <GrFormNext onClick={() => {
                    if (numPag < pagEnd) {
                        setNumPag((prev) => { return ++prev; });
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                }} />
            </div>
        </div>
    )
}

export default Pagination