import React from 'react'
import {Button, Icon, Image} from 'semantic-ui-react'
import className from 'classnames'
import moment from 'moment'
import "moment/locale/es-do"
import './OrderItemAdmin.scss'
import {ORDER_Status} from '../../../../utils/constansts'
import {useOrder, useProduct} from '../../../../hooks'
import {toast} from 'react-toastify'

export function OrderItemAdmin(props) {

  const {order, onReloadOrders} = props;

  const {checkDeliveredOrder, deleteOrdeById} = useOrder()
  const {updateProductInventory} = useProduct()

    const onCheckDeliveredOrder = async() => {
        try{
            console.log(order)
            await checkDeliveredOrder(order._id)
            await updateProductInventory(order.id_product._id, -1)
            onReloadOrders()
            toast.success("Producto entregado")
        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }


    const onDeleteOrder = async() => {
        try{
            await deleteOrdeById(order._id)
            onReloadOrders()
            toast.success("Producto eliminado")
        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }

    const {img_url, name} = order.id_product
    //const {img_url, name} = order.id_product[0]

    return (
    <div className={className("order-item-admin",{
        [order.status.toLowerCase()]:true
    })}>
        <div className='order-item-admin__time'>
            <span>{moment(order.createdAt).format("LT")}</span>{" - "}
            <span>{moment(order.createdAt).startOf('secods').fromNow()}</span>
        </div>
        <div className='order-item-admin__product'>
            <Image src={img_url} />
            <p>{name}</p>
        </div>

        {
            order.status === ORDER_Status.PENDING
            ? (
                <div>
                    <Button primary onClick={onCheckDeliveredOrder }> Marcar entregado </Button>
                    <Button color='red' onClick={onDeleteOrder} ><Icon name='close'></Icon></Button>
                </div>
            )
            : (<h1>Entregado</h1>)
        }

    </div>
  )
}
