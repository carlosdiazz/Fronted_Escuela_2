import React,{useState,useEffect} from 'react'
import {Button} from 'semantic-ui-react'
import {Link, useParams} from 'react-router-dom'
import {Loader} from 'semantic-ui-react'
import {useProduct} from '../../hooks'
import {getProductsCart} from '../../api/cart'
import {size} from 'lodash'
import {ListProductCart} from '../../components/Client'

export function Cart() {

  const [products, setProducts] = useState(null)
  const [reloadCart, setReloadCart] = useState(false)

  const {getProductById} = useProduct()

  const onReloadCart = () => setReloadCart((prev) => !prev)

  const {tableNumber} = useParams()

  useEffect(() => {
    (async() => {
      const idProductsCart = getProductsCart();
      const productsArray = [];

      for await (const idProduct of idProductsCart){
        const response = await getProductById(idProduct)
        productsArray.push(response);

      }
      setProducts(productsArray)

    })()
  }, [reloadCart])

  return (
    <div>
      <h1>Carrito</h1>
      {
        !products
          ? (<Loader active inline='centered'>Cargando</Loader>)
          : size(products) === 0
            ? (<div style={{textAlign: "center"}}>
                <p>Tu carrito esta vacio</p>
                <Link to={`/client/${tableNumber}/orders`}>
                  <Button primary>Ver pedido</Button>
                </Link>
              </div>)
            : (<ListProductCart products={products} onReloadCart={onReloadCart}/>)
        }
    </div>
  )
}
