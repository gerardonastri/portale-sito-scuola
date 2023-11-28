import React, {useState
} from 'react'
import './Create.css'

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
  return (
    <button onClick={downloadExcel}>
      Download As Excel
    </button>
  )
}

export default Create