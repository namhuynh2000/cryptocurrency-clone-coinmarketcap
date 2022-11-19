import React from 'react';
import "./Navbar.scss";
import { AiFillStar, AiFillPieChart } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { CgFormatSlash } from 'react-icons/cg'
import ButtonNav from '../../../ButtonNav/ButtonNav';
import { Link } from "react-router-dom"


function Navbar() {
    return (

        <nav className="navbarWrapper">
            <div className="container">
                <div className="nav-left">
                    <Link to='/' className="logo">
                        <img src="/coinmarketcap-logo.png" alt="coinmarketcap-logo" />
                    </Link>
                    <Link to="/">Cryptocurrencies</Link>
                    <Link to="/News">News</Link>
                </div>
                <div className="nav-right">
                    <ButtonNav auth icon={<AiFillStar size={20} />} toHref="/Watchlist">
                        Watchlist
                    </ButtonNav>
                    <ButtonNav auth icon={<AiFillPieChart size={20} />} toHref="/Portfolio"  >
                        Portfolio
                    </ButtonNav>
                    <div className="searchBtn">
                        <FiSearch size={15} />
                        <input placeholder='Search'>
                        </input>
                        <div className="slashIcon">
                            <CgFormatSlash size={20} />
                        </div>
                    </div>

                </div>

            </div>
        </nav>

    )
}

export default Navbar