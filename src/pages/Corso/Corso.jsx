import React from 'react'
import './Corso.css'
import Navbar from '../../components/Navbar/Navbar'
import {useParams} from 'react-router-dom'

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

     //item
     const [corso, setCorso] = useState(null)
     let { id } = useParams(); 

     useEffect(() => {
        const getData = async () => {
            try{
                const res = await axiosReq.get(`/corso/${id}`)
                setCorso(res.data)
             } catch (error){
                console.log(error);
            }
        }   
 
         getData()
     }, [id])

    //iscrizione al corso
    const handleIscrizione = async () => {
        try {
            await axiosReq.post(`/corso/${id}`, {
                id: user.user._id
            })
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }

    // annullazione iscrizione al corso
     const handleAnnullazione = async () => {
        try {
            await axiosReq.post(`/corso/annulla/${id}`, {
                id: user.user._id
            })
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div className='corso'>
        <Navbar type="white" />
        <div className="wrapper">
            <div className="corso__img">
                <img src={corso?.img} alt="" />
            </div>

           <div className="corso__right">
                <div className="corso__text">
                    <h1>{corso?.name}</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem delectus recusandae, aperiam reprehenderit est fugit iste! Odit porro debitis.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa unde eos neque autem. Doloremque ducimus, tempora, quidem sapiente neque enim mollitia commodi soluta sequi molestias nobis, unde veritatis facilis aut. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum ullam assumenda.</p>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et autem neque nesciunt dolorem doloribus. Quia quas minus est consectetur placeat!</p>
                </div>

                <div className="corso__info">
                    <div className='corso__info-item'>
                        <span><PiClockCountdownThin /></span>
                        <h3>Durata</h3>
                        <p>{corso?.durata}</p>
                    </div>

                    <div className='corso__info-item'>
                        <span><MdLocationCity /></span>
                        <h3>Classe</h3>
                        <p>{corso?.classe}</p>
                    </div>

                    <div className='corso__info-item'>
                        <span><IoIosPeople /></span>
                        <h3>posti</h3>
                        <p>{corso?.capienzaMassima}</p>
                    </div>
                </div>
            

                <div className="corso__action">
                    {corso?.iscritti.includes(user?.user._id) ? (
                        <button onClick={handleAnnullazione}>Annulla iscrizione</button>
                    ) : (
                        <button onClick={handleIscrizione}>Iscrizione</button>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Corso