import React,{useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {useProduct} from '../../hooks'
import {toast} from 'react-toastify'
import { Loader } from 'semantic-ui-react';
import {ListProducts} from '../../components/Client'

export function Products() {

  const {idCategory, tableNumber} = useParams();
  const {loading, products, getProductByCategory} = useProduct()


  useEffect(() => {
    try{
      getProductByCategory(idCategory)
    }catch(error){
      toast.error(error.message)
      console.log(error)
    }
  }, [idCategory])

  return (
    <div>
        <Link to={`/client/${tableNumber}`}>Volver a categoria</Link>
        {
          loading
          ? (<Loader active inline='centered'>Cargando</Loader>)
          : <ListProducts products={products}/>
        }
    </div>
  )
}
