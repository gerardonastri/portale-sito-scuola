import React from 'react'
import './PageNotFound.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

import img from '../../images/404.avif'

const PageNotFound = () => {
  return (
    <div className='pageNotFound'>
        <Navbar type='white' />
        <div className="wrapper">
            <img src={img} alt="Not found img" />
            <div className="pageNotFound__text">
                <h1>OOPS!</h1>
                <h3>Non è stato possibile trovare la pagina <br /> che stai cercando.</h3>
                <p>Torna alla pagina <a href="/">Home</a></p>
            </div>
        </div>


        <Footer />
    </div>
  )
}

export default PageNotFound