import React,{useState, useEffect} from 'react';
import {useOrder, useTable, usePayment} from '../../hooks'
import {map, size, forEach} from 'lodash'
import {useParams} from 'react-router-dom'
import {Loader} from 'semantic-ui-react'
import {OrderHistoryItems} from '../../components/Client'
import {Button} from 'semantic-ui-react'
import {ModalConfirm} from '../../components/Common'
import {PAYMENT_TYPE_ENUM} from '../../utils/constansts'
import {toast} from 'react-toastify'
export function OrdersHistory() {

  const [showTypePayment, setShowTypePayment] = useState(false)
  const [idTable, setIdTable] = useState(null)
  const {getorderByTable, loading, orders, addPaymentToOrder} = useOrder()
  const {getTableByNumber} = useTable();
  const {tableNumber} = useParams()
  const {createPayment, getPaymentByTable} = usePayment()
  const [isRequestAccount, setIsRequestAccount] = useState(false)


  useEffect(() => {
    try{
      ( async ()=> {
        const table = await getTableByNumber(tableNumber)
        const idTableTemp = table[0]._id
        setIdTable(idTableTemp)
        getorderByTable(idTableTemp, "", "orderStatus=asc&orderDate=asc")
      }
      )()
    }catch(error){
      console.log(error)
    }
  }, [])

  useEffect(() => {
    (async() => {
      const response = await getPaymentByTable(idTable)
      setIsRequestAccount(response)
    })()
  }, [idTable])
  



  const onCreatePayment = async(paymentType) => {
    try{
      setShowTypePayment(false)
      let totalPayment = 0;
      forEach(orders, (order) => {
        totalPayment += Number(order.id_product.price)
      })
      
      const paymentData = {
        total_Payment : totalPayment,
        id_table      : idTable,
        payment_Type  : paymentType,
        status_Payment: "PENDING"
      }
      const payment = await createPayment(paymentData)
      for await (const order of orders) {
        await addPaymentToOrder(order._id, payment._id)
      }
      window.location.reload()
      toast.success('Cuenta pedida')
    }catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div>
      <h1>Historial de pedido</h1>
      {
        loading
          ? (<Loader active inline='centered'>Cargando</Loader>)
          : (
            <>
            {
              size(orders) > 0 && (
                <Button primary fluid onClick={
                    () => size(isRequestAccount) === 0 && setShowTypePayment(true)}>
                  {
                    size(isRequestAccount) > 0
                    ? ("La cuenta esta pedida")
                    : ("Pedir la cuenta")
                  }
                </Button>
              )
            }
            {
              map(orders, (order) => (
                <OrderHistoryItems key={order._id} order={order}/>
              ))
            }
            </>
          )
    }

    <ModalConfirm
      title="Pagar con tarjerta o efectivo"
      show={showTypePayment}
      onCloseText="Efectivo"
      onClose={() => onCreatePayment(PAYMENT_TYPE_ENUM.CASH)}
      onConfirmText="Tarjeta"
      onConfirm = {() => onCreatePayment(PAYMENT_TYPE_ENUM.CARD)}
    />


    </div>
  )
}
