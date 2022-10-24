import React from 'react'
import {Image, Button, Icon} from 'semantic-ui-react'
import {map} from 'lodash'
import {addProductCart} from '../../../api/cart'
import {toast} from 'react-toastify'
import './ListProducts.scss'
import {useNavigate, useParams} from 'react-router-dom'

export function ListProducts(props) {

  const {products} = props
  const navigate = useNavigate()
  const {tableNumber} = useParams()

    const addCart = (product) => {
      addProductCart(product._id);
      toast.success(`${product.name} anadido correctamente`)
    }

    const pedir = () => {
      navigate(`/client/${tableNumber}/cart`)
    }

  return (
    <div className="list-product-cart">
      {map(products, (product, index) => (
        <div key={index} className="list-product-cart__product">
          <div>
            <Image src={product.img_url} size='small' />
          </div>
          <span>{product.name}</span>
          <span>{product.price} $RD</span>
          <Button primary icon onClick={() => addCart(product)}>
            <Icon name='add'/>
          </Button>
        </div>
      ))}

      <Button primary fluid onClick={pedir}>
        Ir al carrito
      </Button>
    </div>
  );
}