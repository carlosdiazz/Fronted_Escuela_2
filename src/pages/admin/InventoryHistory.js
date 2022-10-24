import React,{useEffect} from 'react'
import { HeaderPages, TableInventoryHistoryAdmin } from '../../components/Admin'
import {useInventory} from '../../hooks'
import {Loader}from 'semantic-ui-react'
import jsPDF from 'jspdf'

export function InventoryHistory() {


  const {loading, inventory, getInventoryByTables } = useInventory()

  useEffect(() => {
    try{
      getInventoryByTables()
    }catch(error){
      console.log(error)
    }

  }, [])

  const generatePDF = () => {
    let doc = new jsPDF('p',"pt","a1");
    doc.html(document.querySelector('#content'),{
        callback: function(pdf) {
            pdf.save('reporte.pdf')
        }
    })
  }

  const generatePDF2 = () => {
    let doc = new jsPDF('p',"pt","a1");
    doc.html(document.querySelector('#content'),{
        
        callback: function(pdf) {
            pdf.save('reporte.pdf')
        }
    })
  }


  return (
    <>
        <HeaderPages title="Inventarios" btnTitle="Generar Reporte" btnClick={generatePDF}/>
        {
        loading
          ? (<Loader active inline='centered'>Cargando</Loader>)
          : (<TableInventoryHistoryAdmin inventarios={inventory}/>)
      }
    </>
  )
}
