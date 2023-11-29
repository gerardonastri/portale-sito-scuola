import React, {useEffect, useState
} from 'react'
import './Create.css'

import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Card from '../../components/Card/Card';
import { useSelector} from 'react-redux'

import {axiosReq} from '../../utils/apiCalls.js'

import * as XLSX from "xlsx";


const downloadExcel = () => {

  const corso = {
    nome: "Fotografia",
    iscritti: [
      "gerardo",
      "donnie",
      "tyler",
      "alex"
    ]
  }

  const nomeArray = ["corso", corso.nome]
  const aoa = [
    nomeArray
  ]

  corso.iscritti.forEach((utente, i) => {
    aoa.push([i + 1, utente])
  })
  /* create worksheet */
  var ws = XLSX.utils.aoa_to_sheet(aoa);
  /* create workbook and export */
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, "SheetJSExportAOA.xlsx");
};

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