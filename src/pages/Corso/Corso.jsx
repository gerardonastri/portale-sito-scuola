import React from 'react'
import './Corso.css'
import Navbar from '../../components/Navbar/Navbar'

import fotografiaImg from '../../images/foto autogestione/macchina_fotografica-scaled.jpg'

//icons
import { PiClockCountdownThin } from "react-icons/pi";
import { IoIosPeople } from "react-icons/io";
import { MdLocationCity } from "react-icons/md";

import { useSelector} from 'react-redux'
import { axiosReq } from '../../utils/apiCalls';
import { useEffect, useState } from 'react';

const Corso = () => {

    const items = [
        {
            icon: <PiClockCountdownThin />,
            title: "durata",
            info: "3H"
        },
        {
            icon:  <MdLocationCity />,
            title: "classe",
            info: "4G"
        },
        {
            icon: <IoIosPeople />,
            title: "posti",
            info: "25"
        }
    ]

    //controllo token
    const user = useSelector(state => state.currentUser)
  
    useEffect(() => {
        const validate = async () => {
            try {
                const res = await axiosReq.post("/auth/verify", {
                token: user?.token
                })
                
            } catch (error) {
                window.location.replace("/login")
            }
        }
      validate()
    }, [])

  return (
    <div className='corso'>
        <Navbar />
        <div className="wrapper">
            <div className="corso__img">
                <img src={fotografiaImg} alt="" />
            </div>

            <div className="corso__text">
                <h1>Fotografia</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem delectus recusandae, aperiam reprehenderit est fugit iste! Odit porro debitis.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa unde eos neque autem. Doloremque ducimus, tempora, quidem sapiente neque enim mollitia commodi soluta sequi molestias nobis, unde veritatis facilis aut. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum ullam assumenda.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et autem neque nesciunt dolorem doloribus. Quia quas minus est consectetur placeat!</p>
            </div>

            <div className="corso__info">
                {items.map(item => (
                    <div className='corso__info-item'>
                        <span>{item.icon}</span>
                        <h3>{item.title}</h3>
                        <p>{item.info}</p>
                    </div>
                ))}
            </div>

            <div className="corso__action">
                <button>Iscrizione</button>
            </div>
        </div>
    </div>
  )
}

export default Corso