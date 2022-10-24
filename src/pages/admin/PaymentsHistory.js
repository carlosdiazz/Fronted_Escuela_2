import React,{useEffect} from 'react'
import { HeaderPages, TablePayments } from '../../components/Admin'
import {usePayment} from '../../hooks'
import {Loader}from 'semantic-ui-react'
import jsPDF from 'jspdf'

export function PaymentsHistory() {

  const {loading, payments, getPayments} = usePayment()

  useEffect(() => {
    try{
      getPayments()
    }catch(error){
      console.log(error)
    }

  }, [])

  const generatePDF = () => {
    let doc = new jsPDF('p',"pt","a1");
    doc.html(document.querySelector('#payment'),{
        callback: function(pdf) {
            pdf.save('reporte.pdf')
        }
    })
  }

  return (
    <>
      <HeaderPages title="Pagos" btnTitle="Generar Reporte" btnClick={generatePDF}/>
      {
        loading
          ? (<Loader active inline='centered'>Cargando</Loader>)
          : (<TablePayments payments={payments}/>)
      }
    </>
  )
}
