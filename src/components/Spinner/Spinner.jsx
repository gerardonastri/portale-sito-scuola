import React from 'react'
import './Spinner.css'
import spinner from '../../images/spinner.svg'

const Spinner = ({isActive}) => {
  return (
    <div className={isActive ? "spinner active" : "spinner"}>
        <img src={spinner} alt="" />
    </div>
  )
}

export default Spinner