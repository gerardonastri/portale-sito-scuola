import React, {useEffect, useState} from 'react'
import './Iscrizioni.css'

import Navbar from '../../components/Navbar/Navbar'
import Card from '../../components/Card/Card'
import Footer from '../../components/Footer/Footer'
import { axiosReq } from '../../utils/apiCalls';

import { useSelector } from 'react-redux';

const Iscrizioni = () => {

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

    //corsi utente
    const [corsi, setCorsi] = useState(null)

    useEffect(() => {
        const getCorsi = async () => {
            try {
                const res = await axiosReq.get(`/corso/iscrizioni/${user?.user._id}`)
                setCorsi(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getCorsi()
    }, [user?.user._id])

  return (
    <div className='iscrizioni'>
        <Navbar type='white' />
        <div className="wrapper">
           {corsi.length > 0 ? (
                <>
                    <h2>Corsi a cui sei iscritto</h2>
                    <div className="manage__items">
                        {corsi?.map(item => (
                            <Card item={item} userPage={true} />
                        ))}
                    </div>
                </>
           ) : (
                <h1>Non sei iscritto a nessun corso!</h1>
           )}
            
        </div>


        <Footer />
    </div>
  )
}

export default Iscrizioni