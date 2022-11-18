import React from 'react';
import "./NameSection.scss";
import { AiFillStar } from "react-icons/ai";
import { BiStar, BiLinkAlt } from "react-icons/bi";
// import {BiLinkAlt} from "react-icons";
import { FiExternalLink, FiSearch } from "react-icons/fi";
import { HiChevronDown, HiCode } from "react-icons/hi";
import { BsChatFill } from "react-icons/bs";
import { IoNewspaperOutline } from "react-icons/io5";
import { RiUser3Fill } from "react-icons/ri"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from "../../app/reduces/userSlice";
import { updateWatchListFunction } from '../../utils/logicFirebase';




function NameSection({ coinDetail }) {
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();
    console.log(coinDetail);

    async function updateWatchList(id, data, user) {
        if (id) {
            dispatch(setUser(await updateWatchListFunction(id, data, user)));
        }
    }

    return (
        <>
            <div className="nameSectionWrapper">
                <div className="nameHeader">
                    <img style={{ width: '32px' }} src={coinDetail.iconUrl} alt={`icon-${coinDetail.name}`} />
                    <div className="name">{coinDetail.name}</div>
                    <div className="symbol">{coinDetail.symbol}</div>
                    <div className="rank">Rank <span>#{coinDetail.rank}</span></div>
                    <div className="starIcon">
                        {user?.watchList?.includes(coinDetail.uuid) ?
                            <AiFillStar onClick={() => { updateWatchList(user?.uid, coinDetail.uuid, user) }} size={17} color='#ffd900' /> :
                            <BiStar onClick={() => { updateWatchList(user?.uid, coinDetail.uuid, user) }} size={17} color='#A1A7BB' />}
                    </div>
                </div>
                <div className="links">
                    <div className="web"><BiLinkAlt />Website<FiExternalLink /></div>
                    <div className="explorers"><FiSearch />Explorers<HiChevronDown /></div>
                    <div className="community"><RiUser3Fill />Community<HiChevronDown /></div>
                    <div className="chat"><BsChatFill />Chat<HiChevronDown /></div>
                    <div className="code"><HiCode />Source code<FiExternalLink /></div>
                    <div className="whitePaper"><IoNewspaperOutline />Whitepaper<FiExternalLink /></div>

                </div>
                <div className="tags">
                    <div className="heading">Tags:</div>
                    <div className="content">
                        <Link className="tag">
                            proof-of-work
                        </Link>
                        <Link className="tag">
                            proof-of-work
                        </Link>
                        <Link className="tag">
                            proof-of-work
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NameSection