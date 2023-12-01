import React, {useEffect, useState
} from 'react'
import './Create.css'

import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Card from '../../components/Card/Card';
import { useSelector} from 'react-redux'

import {axiosReq} from '../../utils/apiCalls.js'



const Create = () => {

  const [items, setItems] = useState(null)

  const user = useSelector(state => state.currentUser)

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axiosReq.get(`/corso/organizzatore/${user?.user._id}`)
        setItems(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    getData()
  }, [user?.user._id])

  return (
    <div className="manage">
      <Navbar type='white' />
      <div className="wrapper">
        <h2>Gestisci da qui i corsi</h2>
        <div className="manage__items">
          {items?.map(item => (
            <Card item={item} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Create