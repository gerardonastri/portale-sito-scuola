import React from 'react'
import './Admin.css'

import Navbar from '../../components/Navbar/Navbar'




const Create = () => {

  const sections = [
    {
      name: "users",
      img: "https://images.pexels.com/photos/3585088/pexels-photo-3585088.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      name: "corsi",
      img: "https://images.pexels.com/photos/12425927/pexels-photo-12425927.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  ]

  return (
    <div className="admin">
      <Navbar type='white' />
      <div className="wrapper">
        <div className="sections__container">
          {sections.map(section => (
            <a href={`/admin/${section.name}`} className="admin__item">
              <img src={section.img} alt="" />
              <h2>{section.name}</h2>
              <div className="img-overlay" />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Create