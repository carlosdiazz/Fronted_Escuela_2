import React,{useState, useEffect} from 'react'
import {HeaderPages, TableInventoryAdmin } from '../../components/Admin'
import {Loader} from 'semantic-ui-react'
import {useProduct} from '../../hooks'

export function InventoryAdmin() {


  const [refetch,setRefetch] = useState(false)


  const {loading, products, getProducts, updateProductInventory} = useProduct()


  useEffect(() => {
    try{
      getProducts()
    }catch(error){
      console.log(error)
    }
  }, [refetch])

  const onRefetch = () => setRefetch((prev) => !prev)


  return (
    <>
        <HeaderPages title="Inventario" />
        {
          loading
          ? (<Loader active inline='centered'>Cargando...</Loader>)
          : <TableInventoryAdmin
          products={products}
          updateProductInventory={updateProductInventory}
          refetch={onRefetch}
          />
        }
    </>
  )
}
