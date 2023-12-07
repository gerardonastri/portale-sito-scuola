import React from 'react'
import './Autogestione.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

//images
import featuredImg from '../../images/foto autogestione/featured.webp'

import { useSelector} from 'react-redux'

import { axiosReq } from '../../utils/apiCalls';
import { useEffect, useState } from 'react';
import PopUp from '../../components/PopUp/PopUp'


const Autogestione = () => {

    //controllo del token
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

    //items
    const [corsi, setCorsi] = useState(null)

    useEffect(() => {
        const getData = async () => {
            try{
                const res = await axiosReq.get("/corso")
                setCorsi(res.data)
            } catch (error){
                console.log(error);
            }
        }   

        getData()
    }, [])

  return (
    <div className="autogestione">
        <Navbar />
        <div className="autogestione__featured">
            <img src={featuredImg} alt="" />
            <div className="autogestione__featured-text">
                <h1>IIS Margherita Hack</h1>
                <h3>autogestione</h3>
            </div>
            <div className="overlay" />
        </div>

       <div className="wrapper">
            <div className="autogestione__text">
                <h2>Scegli il corso più adatto a te</h2>
                <p>qui sono presenti tutti i corsi proposti da voi, scegline uno o più e sarai pronto ad imparare tutto</p>
            </div>

            <div className="autogestione__items">
                {corsi?.map(corso => (
                    <a href={`/corso/${corso._id}`} className="autogestione__items-element">
                       <div className="autogestione__items-element_text">
                            <h2>{corso.name}</h2>
                            <p>{corso.desc}</p>
                       </div>
                       <div className="img-overlay" />
                        <img src={corso.img} alt="" />
                    </a>
                ))}
            </div>
       </div>

       <Footer />
       <PopUp />
    </div>
  )
}

export default Autogestione