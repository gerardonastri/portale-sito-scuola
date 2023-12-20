import React from 'react'
import './Card.css'

import { GiTeacher } from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";

import { IoTimeOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";

const Card = ({item, adminPage = false, userPage = false}) => {

  console.log(item);

  return (
    <div className='card'>
      <div className="card__up">
        <h3>{item?.name && item?.name}</h3>
      </div>
      <a href={`/corso/${item?._id}`} className="card__items">
        {userPage ? (
          <>
            {/* <span><GiTeacher />{item?.organizzatore?.name.split(" ")[0] }</span> */}
            <span><FaLocationDot />{item?.classe && item?.classe}</span>
            <span><IoTimeOutline />{item?.durata && item?.durata}</span>
          </>
        ) : (
          <>
          {/* <span><GiTeacher />{item?.organizzatore?.name && item?.organizzatore.name.split(" ")[0]}</span> */}
          <span><IoIosPeople />{item?.capienzaMassima && item?.capienzaMassima}</span>
          <span><IoTimeOutline />{item?.durata && item?.durata}</span>
          </>
        )}
      </a>
      {adminPage && (
        <a className='card__bottom' href={`/manage/${item?._id}`}>modifica</a>
        )}
        {userPage ? (
          <></>
        ) : (
         <a className='card__bottom' href={`/iscritti/${item?._id}`}>vedi iscritti</a>
       )}
    </div>
  )
}

export default Card