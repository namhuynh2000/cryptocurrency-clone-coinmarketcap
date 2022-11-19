import React from 'react';
import "./ButtonLink.scss";
import { FiExternalLink } from "react-icons/fi";
import { HiChevronDown } from "react-icons/hi";



function ButtonLink({ iconStart, dataLink = [], children }) {

    if (dataLink.length === 0)
        return (<></>)

    return (

        <div className="buttonLinkWrapper">
            {dataLink?.length === 1 ? (
                <a href={dataLink[0].url} >
                    <div className="buttonLink">
                        {iconStart}
                        {children}
                        <FiExternalLink />
                    </div>
                </a>

            )
                : (<div className="buttonLink">
                    {iconStart}
                    {children}
                    <div className="wrapperList">
                        <div className="tritangle"></div>
                        <div className="listLink">
                            {dataLink.map((link, index) => {
                                return (<a href={link.url} key={index}>{link.name}</a>)
                            })}
                        </div>
                    </div>
                    <HiChevronDown />
                </div>
                )}
        </div>

    )
}

export default ButtonLink