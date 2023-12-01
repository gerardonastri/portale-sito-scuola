import React from 'react'
import './Card.css'

import { GiTeacher } from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";

import { IoTimeOutline } from "react-icons/io5";

const Card = ({item, adminPage = false}) => {
  return (
    <a href={adminPage ? `/manage/${item._id}` : `/iscritti/${item._id}`} className='card'>
      <div className="card__up">
        <h3>{item.name}</h3>
      </div>
      <div className="card__items">
        <span><GiTeacher />{item.organizzatore.name.split(" ")[0]}</span>
        <span><IoIosPeople />{item.capienzaMassima}</span>
        <span><IoTimeOutline />{item.durata}</span>
      </div>
      <div className="card__bottom">
        <span>
          {adminPage ? (
            <span>modifica</span>
          ) : (
            <span>vedi iscritti</span>
          )}
        </span>
      </div>
    </a>
  )
}

export default Card