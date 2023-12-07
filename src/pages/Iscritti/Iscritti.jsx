import React, {useState, useEffect} from 'react'
import './Iscritti.css'

import {useParams} from 'react-router-dom'
import { axiosReq } from '../../utils/apiCalls';
import Navbar from '../../components/Navbar/Navbar'

import { IoIosSearch } from "react-icons/io";

import * as XLSX from "xlsx";


const downloadExcel = (lista, nomeCorso) => {


  const nomeArray = ["n°", "iscritto", "slot"]
  const aoa = [
    nomeArray
  ]

  lista?.forEach((utente, i) => {
    aoa.push([i + 1, utente.user.name, utente.slot])
  })
  /* create worksheet */
  var ws = XLSX.utils.aoa_to_sheet(aoa);
  /* create workbook and export */
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, "SheetJSExportAOA.xlsx");
};

const Iscritti = () => {

    const [lista, setLista] = useState(null)
    const [name, setName] = useState(null)
    let { id } = useParams(); 

    useEffect(() => {
       const getData = async () => {
          try{
             const res = await axiosReq.get(`/corso/iscritti/${id}`)
             setLista(res.data.lista)
             setName(res.data.name)
          } catch (error){
             console.log(error);
          }
     }   

     getData()
    }, [id])


  return (
    <div className='iscritti users'>
        <Navbar type="white" />
        <div className="wrapper">
          <h2>Iscritti al corso</h2>
          <div className="users__topbar">
            <div>
              <button onClick={() => downloadExcel(lista, name)}>download excel</button>
            </div>
            {/* <form>
                <input type="text" placeholder='Cerca...' value={search} onChange={(e) => handleChange(e)} />
                <IoIosSearch />
            </form> */}
          </div>
          <div className="users__container">
            <div className="users__container-topbar">
              <span>nome</span>
              <span>classe</span>
              <span>slot</span>
            </div>
              <div className="users__container-items">
                {lista?.map(item => (
                  <a href="#">
                    <span>{item.user.name}</span>
                    <span>{item.user.classe}</span>
                    <span>{item.slot}</span>
                  </a>
               ))}
              </div>
            </div>
        </div>
    </div>

            


  )
}

export default Iscritti