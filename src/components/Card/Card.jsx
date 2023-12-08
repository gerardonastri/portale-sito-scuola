import React from 'react'
import './Card.css'

import { GiTeacher } from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";

import { IoTimeOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";

const Card = ({item, adminPage = false, userPage = false}) => {

  console.log(item)

  return (
    <div className='card'>
      <div className="card__up">
        <h3>{item.name}</h3>
      </div>
      <div className="card__items">
        {userPage ? (
          <>
            <span><GiTeacher />{item.organizzatore.name.split(" ")[0]}</span>
            <span><FaLocationDot />{item.classe}</span>
            <span><IoTimeOutline />{item.durata}</span>
          </>
        ) : (
          <>
          <span><GiTeacher />{item.organizzatore.name.split(" ")[0]}</span>
          <span><IoIosPeople />{item.capienzaMassima}</span>
          <span><IoTimeOutline />{item.durata}</span>
          </>
        )}
      </div>
      <div className="card__bottom">
        <span>
          {adminPage && (
            <a href={`/manage/${item._id}`}>modifica</a>
          )}
          {userPage ? (
            <></>
          ) : (
            <span href={`/iscritti/${item._id}`}>vedi iscritti</span>
          )}
        </span>
      </div>
    </div>
  )
}

export default Card