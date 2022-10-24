import React, {useEffect, useState} from 'react'
import {Loader} from 'semantic-ui-react'
import {HeaderPages, TableProductAdmin, AddEditProductForm} from '../../components/Admin'
import {useProduct} from '../../hooks'
import {ModalBasic} from '../../components/Common'
import {toast} from 'react-toastify'

export function ProductosAdmin() {

  const [showModal, setShowModal] = useState(false)
  const [titleModal, setTitleModal] = useState(null)
  const [contentModal, setContentModal] = useState(null)
  const [refetch,setRefetch] = useState(false)


  const {loading, products, getProducts, deleteProduct} = useProduct()


  useEffect(() => {
    try{
      getProducts()
    }catch(error){
      console.log(error)
    }
  }, [refetch])

  const openCloseModal = () => setShowModal((prev) => !prev)
  const onRefetch = () => setRefetch((prev) => !prev)

  const addProduct = () => {
    setTitleModal('Nuevo producto')
    setContentModal(<AddEditProductForm onClose={openCloseModal} onRefetch={onRefetch}/>)
    openCloseModal()
  }

  const updateProduct = (data) => {
    setTitleModal('Actualizar Producto')
    setContentModal(<AddEditProductForm onClose={openCloseModal} onRefetch={onRefetch} product={data}/>)
    openCloseModal()
  }

  const onDeleteProduct = async(data) => {
    const result = window.confirm(`Estas sguro que deseas eliminar este producto: ${data.name}`)
    if (result) {
      await deleteProduct(data._id);
      toast.success(`Producto eliminado`)
      onRefetch();
    }
  }


  return (
    <div>
        <HeaderPages title='Productos' btnTitle='Crear nuevo Producto' btnClick={addProduct} />
        {
          loading
          ? (<Loader active inline='centered'>Cargando...</Loader>)
          : (<TableProductAdmin
              products={products}
              updateProduct={updateProduct}
              deleteProduct={onDeleteProduct}/>)
        }

        <ModalBasic
          show={showModal}
          onClose={openCloseModal}
          title={titleModal}
          children={contentModal}
        />

    </div>
  )
}
