import React, {useState} from 'react'
import './Create.css'
import Navbar from '../../components/Navbar/Navbar'
import { useSelector } from 'react-redux'
import { axiosReq } from '../../utils/apiCalls'

import storage from '../../utils/firebase';

const Create = () => {

    const user = useSelector(state => state.currentUser)

    const [name, setName] = useState(null)
    const [desc, setDesc] = useState(null)
    const [img, setImg] = useState(null)
    const [classe, setClasse] = useState(null)
    const [capienzaMassima, setCapienzaMassima] = useState(null)
    const [durata, setDurata] = useState(null)
    const [slot, setSlot] = useState(null)

    const handleCreate = async () => {
        const fileData = await storage.ref(`corsi/${img.name}`).put(img)
        const imageSrc = await fileData.ref.getDownloadURL()
        try {
            await axiosReq.post("/corso", {
                name,
                desc,
                img: imageSrc,
                classe,
                capienzaMassima,
                durata,
                slot,
                organizzatore: user.user._id
            })
            window.location.replace("/admin/corsi")
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='create'>
        <Navbar type='white' />
        <div className="wrapper">
            <h2>Crea corso</h2>
            <div className="edit__container">
                <div className="edit__left">
                    <div className="blue-btn">
                        <label htmlFor="coverImg">immagine</label>
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
                            <label>slot</label>
                            <input type="number" placeholder={slot && slot} value={slot && slot} onChange={(e) => setSlot(e.target.value)}  />
                        </div>
                        <div className="inputGroup">
                            <label>classe corso</label>
                            <input type="text" placeholder={classe && classe} value={classe && classe} onChange={(e) => setClasse(e.target.value)} />
                        </div>
                    </div>

                    <div className="edit__desc">
                        <label>descrizione corso</label>
                        <textarea cols="30" rows="10" placeholder={desc && desc} value={desc && desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                    </div>

                    <div className="red-btn">
                        <button onClick={handleCreate}>salva modifiche</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Create