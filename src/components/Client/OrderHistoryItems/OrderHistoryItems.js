import React from 'react'
import {Image} from 'semantic-ui-react'
import classNames from 'classnames'
import moment from 'moment'
import "moment/locale/es-do"
import './OrderHistoryItems.scss'
import {ORDER_Status} from '../../../utils'

export function OrderHistoryItems(props) {

  const {order} = props

  const {name, img_url} = order.id_product

  return (
    <div className={classNames('order-history-item', {
      [order.status.toLowerCase()] : order.status
    })}>
      <div className='order-history-item__time'>
        <span>
          Pedido {moment(order.createdAt).startOf('second').fromNow()}
        </span>
      </div>

      <div className='order-history-item__product'>
        <Image src={img_url} size='tiny'/>
        <p>{name}</p>
      </div>

      {
        order.status === ORDER_Status.PENDING
        ? (<span className='prueba'>En marcha</span>)
        : (<span className='prueba'>Entregado</span>)
      }
    </div>
  )
}
