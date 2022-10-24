import React, {useState} from 'react'
import {Table, Button, Icon, Search} from 'semantic-ui-react'
import {map} from 'lodash'
import moment from 'moment'
import {ModalBasic} from '../../../Common'
import {PaymentProductList} from '../../../Admin'
import './TablePayments.scss'

export function TablePayments(props) {

    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState(null)
    const [contentModal, setContentModal] = useState(null)

    const {payments} = props

    const [searchMetodoPago, setsearchMetodoPago] = useState('')
    const [searchMesa, setsearchMesa] = useState('')

    const cambiar_input = (value) => {
        setsearchMetodoPago(value.target.value)
    }

    const cambiar_input_Mesa = (value) => {
        setsearchMesa(value.target.value)
    }

    const getIconPaymentName = (key) => {
        if(key === 'CARD') return "credit card"
        if(key === 'CASH') return "money bill alternate"
        return null
    }

    const openCloseModal = () => setShowModal((prev) => !prev)

    const showDetails = (payment) => {

        setTitleModal(`Pedidos de la mesa #${payment?.id_table?.number}`)
        setContentModal(<PaymentProductList payment={payment}/>)
        openCloseModal()
    }

  return (
    <>

    <Table>
            <Table.Header>
                <Table.Row>
                  <Table.HeaderCell textAlign='left' width={1}>
                    <Search value={searchMetodoPago} showNoResults={false} onSearchChange={cambiar_input}  placeholder="Filtrar Metodo de Pago"/>
                  </Table.HeaderCell>
                  <Table.HeaderCell >
                    <Search value={searchMesa} showNoResults={false} onSearchChange={cambiar_input_Mesa}  placeholder="Filtrar Por Mesa"/>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
    </Table>

    <div id="payment">
    <h3>Historial de pagos</h3>
    <Table className='table-payments-admin' color='green'>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Mesa</Table.HeaderCell>
                <Table.HeaderCell>Total</Table.HeaderCell>
                <Table.HeaderCell>Tipo de pago</Table.HeaderCell>
                <Table.HeaderCell>Fecha - Hora de pago</Table.HeaderCell>
                <Table.HeaderCell >Informacion</Table.HeaderCell>

            </Table.Row>
        </Table.Header>

        <Table.Body>
            {
                map(payments, (payment, index) =>
                    payment.payment_Type.includes(searchMetodoPago) ?
                    payment?.id_table?.number.toString().includes(searchMesa)?
                    (
                    <Table.Row key={index}>
                        <Table.Cell>{payment._id}</Table.Cell>
                        <Table.Cell>{payment?.id_table?.number}</Table.Cell>
                        <Table.Cell>{payment.total_Payment} $RD</Table.Cell>
                        <Table.Cell>
                            <Icon name={getIconPaymentName(payment.payment_Type)} />
                            {payment.payment_Type}
                        </Table.Cell>
                        <Table.Cell>{moment(payment.createdAt).format("DD/MM/YYYY - LT")}</Table.Cell>
                        <Table.Cell >
                            <Button icon onClick={() => showDetails(payment)}>
                                <Icon name='eye'></Icon>
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                ):null:null)
            }
        </Table.Body>

    </Table>
    </div>
    <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
    />
    </>
  )
}
