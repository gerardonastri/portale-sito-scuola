import React from 'react'
import './Home.css'

import img from '../../images/mantainance.svg'

const Home = () => {
  return (
    <div className='home'>
      <img src={img} alt="" />
      <h1>Ritorneremo... Ci stiamo aggiornando</h1>
    </div>
  )
}

export default Home