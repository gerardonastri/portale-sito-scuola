import React from 'react'
import './Corso.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import {useParams} from 'react-router-dom'

import fotografiaImg from '../../images/foto autogestione/macchina_fotografica-scaled.jpg'

//icons
import { PiClockCountdownThin } from "react-icons/pi";
import { IoIosPeople } from "react-icons/io";
import { MdLocationCity } from "react-icons/md";

import { useDispatch, useSelector} from 'react-redux'
import { axiosReq } from '../../utils/apiCalls';
import { useEffect, useState } from 'react';

import {loginSuccess} from '../../redux/userRedux'

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

    const [slot, setSlot] = useState(1)
    const dispatch = useDispatch()
    const handleIscrizione = async () => {
        try {
            const res = await axiosReq.post(`/corso/${id}`, {
                id: user.user._id,
                slot: slot,
                token: user?.token
            })
            dispatch(loginSuccess(res.data))
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }

    // annullazione iscrizione al corso
     const handleAnnullazione = async () => {
        try {
            const res = await axiosReq.post(`/corso/annulla/${id}`, {
                id: user.user._id,
                slot: slot,
                token: user?.token
            })
            dispatch(loginSuccess(res.data))
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }

    const [canSubscribe, setCanSubscribe] = useState("si")

    useEffect(() => {
        const handleCanSub = () => {

            let counter = 0;
            corso?.iscritti?.forEach(item => {
                if(item.user === user?.user._id && item.slot === slot){
                    counter++;
                }
            })

            let isSlotLibero = true;
            for(let i = slot; i < corso?.durata + slot; i++){
                if(!user?.user.slotLiberi.includes(i)){
                    isSlotLibero = false;
                }
            }
            
           if(counter === 0){
            isSlotLibero ? setCanSubscribe("si") : setCanSubscribe("occupato");
           } else {
            setCanSubscribe("no")
           }
        }
        handleCanSub()
    }, [corso?.iscritti, slot, canSubscribe, user?.user._id, user?.user.slotLiberi, corso?.durata])

    
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
                    {canSubscribe == 'no' && (
                        <button onClick={handleAnnullazione}>Annulla iscrizione</button>
                    )}
                    {canSubscribe == 'si' && (
                        <button onClick={handleIscrizione}>Iscrizione</button>
                    )}
                    {canSubscribe == 'occupato' && (
                        <button onClick>Slot occupato</button>
                    )}
                </div>

                <div className="corso__slot">
                    <span>Slot del corso:</span>
                    <select value={slot} onChange={(e) => setSlot(parseInt(e.target.value))}>
                    {Array.from({ length: corso?.slot }).map((it, i) => (
                        <option value={i + 1}>{i + 1}</option>
                    ))}
                    </select>
                </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default Corso