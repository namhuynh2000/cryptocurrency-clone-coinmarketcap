import React from 'react';
import "./NameSection.scss";
import { AiFillStar, AiOutlineMenu } from "react-icons/ai";
import { BiStar, BiLinkAlt } from "react-icons/bi";
// import {BiLinkAlt} from "react-icons";
import { FiSearch } from "react-icons/fi";
import { HiCode } from "react-icons/hi";
import { BsChatFill } from "react-icons/bs";
import { IoNewspaperOutline } from "react-icons/io5";
import { RiUser3Fill } from "react-icons/ri"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from "../../app/reduces/userSlice";
import { updateWatchListFunction } from '../../utils/logicFirebase';
import ButtonLink from '../ButtonLink/ButtonLink';


function NameSection({ coinDetail }) {
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();
    console.log(coinDetail);

    const web = [];
    const explorer = [];
    const community = [];
    const chat = [];
    const code = [];
    const whitePaper = [];
    const otherLink = [];

    coinDetail?.links.forEach(link => {
        switch (link.type) {
            case 'website': {
                web.push(link);
                break;
            }
            case 'github': {
                code.push(link);
                break;
            }
            case 'explorer': {
                explorer.push(link);
                break;
            }
            case 'whitepaper': {
                whitePaper.push(link);
                break;
            }
            case ('discord' || 'telegram'): {
                chat.push(link);
                break;
            }
            case ('reddit' || 'facebook' || 'linkedin' || 'twitter' || 'medium' || 'youtube' || 'instagram'): {
                community.push(link);
                break;
            }
            default: {
                otherLink.push(link);
                break;
            }
        }
    })

    async function updateWatchList(id, data, user) {
        if (id) {
            dispatch(setUser(await updateWatchListFunction(id, data, user)));
        }
    }

    return (

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
                <ButtonLink iconStart={<BiLinkAlt />} dataLink={web} >
                    Webstite
                </ButtonLink>
                <ButtonLink iconStart={<FiSearch />} dataLink={explorer} >
                    Explorers
                </ButtonLink>
                <ButtonLink iconStart={<RiUser3Fill />} dataLink={community} >
                    Community
                </ButtonLink>
                <ButtonLink iconStart={<BsChatFill />} dataLink={chat} >
                    Chat
                </ButtonLink>
                <ButtonLink iconStart={<HiCode />} dataLink={code} >
                    Source code
                </ButtonLink>
                <ButtonLink iconStart={<IoNewspaperOutline />} dataLink={whitePaper} >
                    Whitepaper
                </ButtonLink>
                <ButtonLink iconStart={<AiOutlineMenu />} dataLink={otherLink} >
                    Other
                </ButtonLink>

            </div>
            <div className="tags">
                <div className="heading">Tags:</div>
                <div className="content">
                    {coinDetail?.tags.map(tag => {
                        return (<Link to={`/Tag/${tag}`} key={tag} className='tag'>
                            {tag}
                        </Link>)
                    })}
                </div>
            </div>
        </div>

    )
}

export default NameSection