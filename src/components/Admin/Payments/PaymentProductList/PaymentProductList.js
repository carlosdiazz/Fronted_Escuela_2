import React,{useEffect, useState} from 'react'
import {useOrder} from '../../../../hooks'
import {map} from 'lodash'
import {Image} from 'semantic-ui-react'
import './PaymentProductList.scss'

export function PaymentProductList(props) {

    const {payment} = props
    const [orders, setOrders] = useState([])

    const {getOrdersByPayment} = useOrder()


    useEffect(() => {
        (async()=> {
            const response = await getOrdersByPayment(payment._id)
            setOrders(response)
        })()
    }, [])

    return (
    <div className='payment-product-list'>
        {
            map(orders, (order) => (
                <div className='payment-product-list__product' key={order._id}>
                    <div>
                    <Image src={order.id_product.img_url} avatar size='tiny' />
                    <span>{order.id_product.name}</span>
                </div>
                    <span>{order.id_product.price} $RD</span>
                </div>
        ))}
    </div>
  )
}
