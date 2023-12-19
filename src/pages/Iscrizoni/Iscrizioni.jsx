import React, {useEffect, useState} from 'react'
import './Iscrizioni.css'

import Navbar from '../../components/Navbar/Navbar'
import Card from '../../components/Card/Card'
import Footer from '../../components/Footer/Footer'
import { axiosReq } from '../../utils/apiCalls';

import { useSelector } from 'react-redux';
import Spinner from '../../components/Spinner/Spinner'

const Iscrizioni = () => {

    //controllo token
    const user = useSelector(state => state.currentUser)
  

    //corsi utente
    const [corsi, setCorsi] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const getCorsi = async () => {
            setIsLoading(true)
            try {
                const res = await axiosReq.get(`/corso/iscrizioni/${user?.user._id}`)
                setCorsi(res.data)
                setIsLoading(false)
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
           {!isLoading && corsi?.length > 0 ? (
                <>
                    <h2>Corsi a cui sei iscritto</h2>
                    <div className="manage__items">
                        {corsi?.map(item => (
                            <Card item={item} userPage={true} />
                        ))}
                    </div>
                </>
           ) : (
                <>
                    {isLoading ? (
                        <Spinner isActive={isLoading} />
                    ) : (
                        <h1>Non sei iscritto a nessun corso!</h1>
                    )}
                </>
           )}
            
        </div>


        <Footer />
    </div>
  )
}

export default Iscrizioni