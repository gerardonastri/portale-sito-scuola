import React from 'react'
import './Corso.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import {useParams} from 'react-router-dom'

//icons
import { PiClockCountdownThin } from "react-icons/pi";
import { IoIosPeople } from "react-icons/io";
import { MdLocationCity } from "react-icons/md";

import { useDispatch, useSelector} from 'react-redux'
import { axiosReq } from '../../utils/apiCalls';
import { useEffect, useState } from 'react';

import {loginSuccess} from '../../redux/userRedux'

const Corso = () => {

    

    //controllo token
    const user = useSelector(state => state.currentUser)
  
     //item
     const [corso, setCorso] = useState(null)
     const [slot, setSlot] = useState(1)
     let { id } = useParams(); 

     useEffect(() => {
        const getData = async () => {
            try{
                const res = await axiosReq.get(`/corso/${id}`)
                setCorso(res.data)
                if(res.data.ora){
                    setSlot(res.data.ora)
                }
             } catch (error){
                console.log(error);
            }
        }   
         getData()
     }, [id])

    //iscrizione al corso

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
                } else if(item.user === user?.user._id) {
                    counter = -1
                }
            })

            let isSlotLibero = true;
            if(corso?.durata === 1){
                for(let i = slot; i < corso?.durata + slot; i++){
                    if(!user?.user.slotLiberi.includes(i)){
                        isSlotLibero = false;
                    }
                }
            }  else if (corso?.durata === 2){
                if(slot === 1){
                    for(let i = slot; i < corso?.durata + slot; i++){
                        if(!user?.user.slotLiberi.includes(i)){
                            isSlotLibero = false;
                        }
                    }
                } else if(slot === 2){
                    if(!user?.user.slotLiberi.includes(slot + 1) || !user?.user.slotLiberi.includes(slot + 2)){
                        isSlotLibero = false;
                    }
                } else if(slot === 3){
                    if(!user?.user.slotLiberi.includes(slot + 2) || !user?.user.slotLiberi.includes(slot + 3)){
                        isSlotLibero = false;
                    }
                }
            }  else if (corso?.durata === 3){
                if(slot === 1){
                    if(!user?.user.slotLiberi.includes(slot) || !user?.user.slotLiberi.includes(slot + 1) || !user?.user.slotLiberi.includes(slot + 2)){
                        isSlotLibero = false;
                    }
                } else if(slot === 2){
                    if(!user?.user.slotLiberi.includes(slot + 2) || !user?.user.slotLiberi.includes(slot + 3) || !user?.user.slotLiberi.includes(slot + 4)){
                        isSlotLibero = false;
                    }
                } 
            }

            
            
           if(counter === 0){
            isSlotLibero ? setCanSubscribe("si") : setCanSubscribe("occupato");
           } else if(counter < 0){
            setCanSubscribe("iscritto")
           } else {
            setCanSubscribe("no")
           } 

           let iscrittiAlCorso = 0;
           corso?.iscritti?.forEach(item => {
            if(item.slot === slot && item.user !== user?.user._id){
                iscrittiAlCorso++;
            }
           })
           
           if(corso?.capienzaMassima === iscrittiAlCorso && counter === 0){
            setCanSubscribe("sold")
           } 
        }
        handleCanSub()
    }, [corso?.iscritti, slot, canSubscribe, user?.user._id, user?.user.slotLiberi, corso?.durata, corso?.capienzaMassima])

    
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
                    <p>{corso?.desc}</p>
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

                <div className="corso__slot">
                    {Array.from({ length: corso?.slot }).map((it, i) => (
                        <span className={slot === i+1 ? "corso__slot-item active" : "corso__slot-item"} onClick={() => setSlot(corso?.ora ? i + corso?.ora : i + 1)}>Slot {corso?.ora ? i + corso?.ora : i + 1}</span>
                    ))}
                </div>
            

                <div className="corso__action">
                    {canSubscribe == 'no' && (
                        <button onClick={handleAnnullazione}>Annulla iscrizione</button>
                    )}
                    {canSubscribe == 'si' && (
                        <button onClick={handleIscrizione}>Iscrizione</button>
                    )}
                    {canSubscribe == 'occupato' && (
                        <p>Hai già un corso a quest'ora! Seleziona uno slot libero.</p>
                    )}
                    {canSubscribe == 'sold' && (
                        <p>I posti sono finiti! Prova un altro slot o cerca un altro corso libero.</p>
                    )}
                    {canSubscribe == 'iscritto' && (
                        <p>Sei già iscritto a uno slot di questo corso! Puoi selezionarne solo uno per corso.</p>
                    )}
                </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default Corso