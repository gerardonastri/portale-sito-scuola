import React, { useState } from 'react'
import './PopUp.css'

import {axiosReq} from '../../utils/apiCalls'

import {loginSuccess} from '../../redux/userRedux'
import { useDispatch, useSelector} from 'react-redux'

const PopUp = () => {

    const isActive = window.localStorage.getItem("setPlesso")

    const [plesso, setPlesso] = useState("iti")
    const [classe, setClasse] = useState("1")
    const [sezione, setSezione] = useState("E")

    const user = useSelector(state => state.currentUser)

    const dispatch = useDispatch()



   const handleClick = async () => {
    try {
        window.localStorage.setItem("setPlesso", true)
        const res = await axiosReq.put(`/auth/plesso/${user.user._id}`, {
            plesso: plesso.toLowerCase(),
            classe: `${classe}${sezione.toUpperCase()}`,
            token: user.token
        })
        dispatch(loginSuccess(res.data))
        window.location.reload()
    } catch (error) {
        console.log(error);
    }
   }

  return (
    <div className={(!isActive || user?.user.classe.length < 1) ? 'popup active' : 'popup'}>
        <div className="popup__container">
            <h2>Inserisci plesso</h2>
            <select onChange={(e) => setPlesso(e.target.value)}>
                <option value="iti">Iti</option>
                <option value="liceo">Liceo</option>
            </select>
            <h2>Inserisci la classe</h2>
            <div className="selectContainer">
                <select onChange={(e) => setClasse(e.target.value)}>
                    
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <select onChange={(e) => setSezione(e.target.value)}> 
                    {plesso === 'iti' ? (
                        <>
                            <option value="E">E</option>
                            <option value="F">F</option>
                            <option value="G">G</option>
                            {(classe === '1' || classe === '2') && (
                                <option value="H">H</option>
                            )}
                           {classe === '1' && (
                             <option value="I">I</option>
                           )}
                        </>
                    ) : (
                        <>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                        </>
                    )}
                </select>
            </div>
            <button onClick={handleClick}>Invia</button>
            <p>N.B. Se non inserisci la classe giusta possiamo vederlo dall'email :)</p>
        </div>
        <div className="overlay-popup" />
    </div>
  )
}

export default PopUp