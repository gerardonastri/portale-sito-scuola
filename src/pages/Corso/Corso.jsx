import React from 'react'
import './Corso.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import {useParams} from 'react-router-dom'

import img from '../../images/corso.webp'

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
            const res = await axiosReq.post(`/iscritto/`, {
                user: user.user._id,
                slot:  slot,
                corso: corso?._id,
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
            const res = await axiosReq.put(`/iscritto/${id}`, {
                user: user.user._id,
                slot: slot,
                corso: corso?._id,
                token: user?.token
            })
            dispatch(loginSuccess(res.data))
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }

    //gestire se può iscriversi
    const [canSubscribe, setCanSubscribe] = useState("si")
    const [iscrizioniUser, setIscrizioniUser] = useState(null)

    useEffect(() => {
        const getIscrizioni = async () => {
            try {
                const res = await axiosReq.get(`/iscritto/iscrizioni/${user?.user._id}`)
                console.log(res.data);
                setIscrizioniUser(res.data)
            } catch (error) {
                console.log(error);
            }
        }

        getIscrizioni()
    }, [user?.user._id])

    const slotsFront = []
    if(corso?.slots){
        for(let i = 0; i < corso?.slots.length; i++){
            slotsFront.push(i)
        }
    }

    const [iscrizioniCorso, setIscrizioniCorso] = useState(null) 

        useEffect(() => {
         const getIsc = async () => {
          try{
          const res = await axiosReq.get(`/iscritto/iscrizioni/corso/${corso?._id}`) 
        setIscrizioniCorso(res.data) 
        }catch(error) {
          console.log(error) 
        }
          }
         getIsc()
        }, [])

    useEffect(() => {
        const handleCanSub = () => {

            let counter = 0;
            iscrizioniUser?.forEach(item => {
                if(item.user === user?.user._id && item.slot === slot && item.corso?._id === corso?._id){
                    counter++;
                } 
            })

            let isSlotLibero = true;
            
            for(let i = 0; i < corso?.slots[slot - 1].length; i++){
                if(!user?.user.slotLiberi.includes(corso?.slots[slot - 1][i])){
                    isSlotLibero = false;
                }
            }

            
          
           if(counter === 0){
            isSlotLibero ? setCanSubscribe("si") : setCanSubscribe("occupato");
           }   else {
            setCanSubscribe("no")
           } 
           
            
           let iscrittiAlCorso = 0;
           iscrizioniCorso?.forEach(item => {
            if(item.slot === slot && item.user !== user?.user._id){
                iscrittiAlCorso++;
           }
        })

           if(corso?.capienzaMassima === iscrittiAlCorso && counter === 0){
            setCanSubscribe("sold")
           } 
        }
        handleCanSub()
    }, [corso?._id, slot, canSubscribe, user?.user._id, user?.user.slotLiberi, iscrizioniUser, corso?.slots, corso?.capienzaMassima, iscrizioniCorso])

    
  return (
    <div className='corso'>
        <Navbar type="white" />
        <div className="wrapper">
            <div className="corso__img">
                <img src={img} alt="" />
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
                    {slotsFront.map((item) => (
                        <span className={slot === item + 1 ? "corso__slot-item active" : "corso__slot-item"} onClick={() => setSlot(item + 1)}>Slot {item + 1}</span>
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
                    {/* {canSubscribe == 'iscritto' && (
                        <p>Sei già iscritto a uno slot di questo corso! Puoi selezionarne solo uno per corso.</p>
                    )} */}
                </div>
                <div className="corso__stuff">
                    {(canSubscribe == 'no' && corso?.link?.length > 0) && (
                        <p>Iscrivi alla classroom da questo link: <a href={corso?.link}>{corso?.link}</a></p>
                    )}
                </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default Corso