import React, {useState, useEffect} from 'react'
import './Iscritti.css'

import {useParams} from 'react-router-dom'
import { axiosReq } from '../../utils/apiCalls';

import * as XLSX from "xlsx";


const downloadExcel = (lista, nomeCorso) => {


  const nomeArray = ["corso", nomeCorso]
  const aoa = [
    nomeArray
  ]

  lista?.forEach((utente, i) => {
    aoa.push([i + 1, utente.name])
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
    <div className='iscritti'>
        <button onClick={() => downloadExcel(lista, name)}>download</button>
    </div>
  )
}

export default Iscritti