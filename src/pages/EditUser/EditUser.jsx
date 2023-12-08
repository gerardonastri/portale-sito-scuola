import React from 'react'
import './EditUser.css'
import Navbar from '../../components/Navbar/Navbar'
import {useParams} from 'react-router-dom'

import { useDispatch, useSelector} from 'react-redux'


import { axiosReq } from '../../utils/apiCalls';
import { useEffect, useState } from 'react';

import {loginSuccess} from '../../redux/userRedux'

const EditUser = () => {

    const dispatch = useDispatch()

    //item
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [slots, setSlots] = useState(null)
    const [classe, setClasse] = useState(null)
    const [plesso, setPlesso] = useState(null)
    const [organizzatore, setOrganizzatore] = useState(null)
    let { id } = useParams(); 

    useEffect(() => {
        const getData = async () => {
            try{
                const res = await axiosReq.get(`/admin/user/${id}`)
                setName(res.data?.name)
                setEmail(res.data?.email)
                setSlots(res.data?.slotLiberi)
                setClasse(res.data?.classe)
                setPlesso(res.data?.plesso)
                setOrganizzatore(res.data?.organizzatore)
            } catch (error){
                console.log(error);
            }
        }   
 
        getData()
    }, [id])

    
    //edit
    const handleEdit = async () => {

        try {
            const res = await axiosReq.put(`/admin/user/${id}`, {    
                name,
                email,
                organizzatore,
                slotLiberi: slots,
                classe,
                plesso
            })
            dispatch(loginSuccess(res.data))
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div className='edit'>
        <Navbar type="white" />
        <div className="wrapper">
            <h2>modifica utente</h2>

            <div className="edit__container">

               <div className="edit__right">
                    <div className="edit__inputs">
                        <div className="inputGroup">
                            <label>nome</label>
                            <input type="text" placeholder={name && name} value={name && name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="inputGroup">
                            <label>email</label>
                            <input type="number" placeholder={email && email} value={email && email} onChange={(e) => setEmail(e.target.value)}  />
                        </div>
                        <div className="inputGroup">
                            <label>plesso</label>
                            <input type="number" placeholder={plesso && plesso} value={plesso && plesso} onChange={(e) => setPlesso(e.target.value)}  />
                        </div>
                        <div className="inputGroup">
                            <label>classe</label>
                            <input type="text" placeholder={classe && classe} value={classe && classe} onChange={(e) => setClasse(e.target.value)} />
                        </div>
                        <div className="inputGroup">
                            <label>organizzatore</label>
                            <input type="text" placeholder={organizzatore && organizzatore} value={organizzatore && organizzatore} onChange={(e) => setOrganizzatore(e.target.value)} />
                        </div>
                        {/* <div className="inputGroup">
                            <label>slot corso</label>
                            <input type="number" placeholder='3'  />
                        </div> */}
                    </div>

                    <div className="red-btn">
                        <button onClick={handleEdit}>salva modifiche</button>
                    </div>
               </div>
            </div>

        </div>
    </div>
  )
}

export default EditUser