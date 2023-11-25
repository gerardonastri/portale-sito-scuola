import React from 'react'
import './Autogestione.css'
import Navbar from '../../components/Navbar/Navbar'

//images
import featuredImg from '../../images/foto autogestione/featured.webp'
import fotografiaImg from '../../images/foto autogestione/macchina_fotografica-scaled.jpg'
import pittoricaImg from '../../images/foto autogestione/pittorica.jpeg'
import videoImg from '../../images/foto autogestione/video-making.webp'




const Autogestione = () => {

    const corsi = [
        {
            title: "Fotografia",
            image: fotografiaImg
        },
        {
            title: "Pittorica",
            image: pittoricaImg
        },
        {
            title: "Video-Making",
            image: videoImg
        }
    ]

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
                <h2>Scegli il corso più adatto a te e divertiti!</h2>
                <p>qui sono presenti tutti i corsi proposti da voi, scegline uno o più e sarai pronto ad imparare tutto</p>
            </div>

            <div className="autogestione__items">
                {corsi.map(corso => (
                    <a href={`/corso/928384`} className="autogestione__items-element">
                        <h2>{corso.title}</h2>
                        <img src={corso.image} alt="" />
                    </a>
                ))}
            </div>
       </div>
    </div>
  )
}

export default Autogestione