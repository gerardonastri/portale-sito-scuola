import React from 'react'
import './Edit.css'
import Navbar from '../../components/Navbar/Navbar'
import {useParams} from 'react-router-dom'



import { axiosReq } from '../../utils/apiCalls';
import { useEffect, useState } from 'react';

import storage from '../../utils/firebase';

const Edit = () => {

    //item
    const [name, setName] = useState(null)
    const [desc, setDesc] = useState(null)
    const [iscritti, setIscritti] = useState(null)
    const [img, setImg] = useState(null)
    const [classe, setClasse] = useState(null)
    const [capienzaMassima, setCapienzaMassima] = useState(null)
    const [durata, setDurata] = useState(null)
    const [slot, setSlot] = useState(null)
    const [organizzatore, setOrganizzatore] = useState(null)
    let { id } = useParams(); 

    useEffect(() => {
        const getData = async () => {
            try{
                const res = await axiosReq.get(`/corso/${id}`)
                setName(res.data?.name)
                setDesc(res.data?.desc)
                setIscritti(res.data?.iscritti)
                setImg(res.data?.img)
                setClasse(res.data?.classe)
                setCapienzaMassima(res.data?.capienzaMassima)
                setDurata(res.data?.durata)
                setSlot(res.data?.slot)
                setOrganizzatore(res.data?.organizzatore)
            } catch (error){
                console.log(error);
            }
        }   
 
        getData()
    }, [id])

    
    //edit
    const handleEdit = async () => {

        if(img?.name){
            const fileData = await storage.ref(`news/${img.name}`).put(img)
            const imageSrc = await fileData.ref.getDownloadURL()
            setImg(imageSrc)
        }
        try {
            await axiosReq.put(`/corso/${id}`, {    
                name,
                desc,
                iscritti,
                img,
                classe,
                capienzaMassima,
                durata,
                slot,
                organizzatore
            })
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div className='edit'>
        <Navbar type="white" />
        <div className="wrapper">
            <h2>modifica corso</h2>

            <div className="edit__container">
                <div className="edit__left">
                    <img src={img && img} alt="" />
                    <div className="blue-btn">
                        <label htmlFor="coverImg">modifica immagine</label>
                        <input type="file" name="coverImg" id="coverImg" hidden  onChange={(e) => setImg(e.target.files[0])} />
                    </div>
                </div>

               <div className="edit__right">
                    <div className="edit__inputs">
                        <div className="inputGroup">
                            <label>nome corso</label>
                            <input type="text" placeholder={name && name} value={name && name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="inputGroup">
                            <label>posti disponibili totali</label>
                            <input type="number" placeholder={capienzaMassima && capienzaMassima} value={capienzaMassima && capienzaMassima} onChange={(e) => setCapienzaMassima(e.target.value)}  />
                        </div>
                        <div className="inputGroup">
                            <label>durata corso</label>
                            <input type="number" placeholder={durata && durata} value={durata && durata} onChange={(e) => setDurata(e.target.value)}  />
                        </div>
                        <div className="inputGroup">
                            <label>classe corso</label>
                            <input type="text" placeholder={classe && classe} value={classe && classe} onChange={(e) => setClasse(e.target.value)} />
                        </div>
                        <div className="inputGroup">
                            <label>slot corso</label>
                            <input type="number" placeholder={slot && slot} value={slot && slot} onChange={(e) => setSlot(e.target.value)}   />
                        </div>
                    </div>

                    <div className="edit__desc">
                        <label>descrizione corso</label>
                        <textarea cols="30" rows="10" placeholder={desc && desc} value={desc && desc} onChange={(e) => setDesc(e.target.value)}></textarea>
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

export default Edit