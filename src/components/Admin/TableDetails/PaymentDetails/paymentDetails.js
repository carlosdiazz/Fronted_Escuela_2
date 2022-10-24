import React,{useState} from 'react'
import {Table, Button, Icon} from 'semantic-ui-react'
import {usePayment, useOrder} from '../../../../hooks'
import './paymentDetails.scss'
import {toast} from 'react-toastify'
import {ModalConfirm} from '../../../Common/ModalConfirm'
import {map} from 'lodash'


export function PaymentDetails(props) {

    const {payment, orders, openCloseModal, onReloadOrders, generatePDF} = props
    const {closePayment} = usePayment()
    const {closeOrder} = useOrder()

    const [showModalCerrar, setshowModalCerrar] = useState(false)


    const getIconPayment = (key) => {
        if(key === 'CARD') return "credit card"
        if(key === "CASH") return "money bill alternate"
        return null
    }

    const showModal = () => {
        setshowModalCerrar(!showModalCerrar)
    }

    const onCloseTable = async () => {
        try{
            await closePayment(payment._id)
            for await(const order of orders){
                await closeOrder(order._id)
            }
            onReloadOrders()
            openCloseModal()
            toast.success('Pago cerrado')

        }catch(error){
            toast.error(error.message)
            console.log(error)
        }
    }


    return (
    <div >
        <div id="payment-detail2">
        <h3>Factura</h3>

        <Table >
            <Table.Body>
                <Table.Row>
                    <Table.Cell><b>Mesa: </b></Table.Cell>
                    <Table.Cell>{payment?.id_table?.number}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell><b>Metodo de pago:</b></Table.Cell>
                    <Table.Cell>{payment?.payment_Type}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell><b>Productos</b></Table.Cell>
                    <Table.Cell>Precio</Table.Cell>
                </Table.Row>
                {
                    map(orders, (order) => (
                        <Table.Row>
                            <Table.Cell>-- {order?.id_product?.name}</Table.Cell>
                            <Table.Cell>{order?.id_product?.price} $RD</Table.Cell>
                        </Table.Row>
                    ))
                }
                
                <Table.Row>
                    <Table.Cell><b>Total:</b></Table.Cell>
                    <Table.Cell><b>{payment?.total_Payment} $RD</b></Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
        </div>
        <Button primary fluid onClick={showModal} >
            Marcar como pagado y cerrar mesa
        </Button>

        <Button positive fluid onClick={generatePDF} >
            Imprimir Factura
        </Button>

        <ModalConfirm
          title="Estas seguro que deseas cerrar la mesa"
          show={showModalCerrar}
          onCloseText="Si"
          onClose={() => {setshowModalCerrar(false); onCloseTable()}}
          onConfirmText="No"
          onConfirm = {() => {setshowModalCerrar(false);}}
        />

    </div>
  )
}
