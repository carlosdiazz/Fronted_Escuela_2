import React, {useEffect, useState} from 'react'
import {HeaderPages, TableCategoryAdmi, AddEditCategoryForm} from '../../components/Admin'
import {useCategory} from '../../hooks'
import {Loader} from 'semantic-ui-react'
import {ModalBasic} from '../../components/Common'
import {toast} from 'react-toastify'

export  function CategoriaAdmin() {

    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState(null)
    const [contentModal, setContentModal] = useState(null)
    const [refech, setRefech] = useState(false)


    const {loading, categories, getCategories, deleteCategory} = useCategory()

    useEffect(() => {
        getCategories()
    }, [refech])

    const openCloseModal = () => setShowModal((prev) => !prev)
    const onRefetch = () => setRefech((prev)=>!prev)

    const addCategory = () => {
        setTitleModal('Nueva Categoria')
        setContentModal(<AddEditCategoryForm onClose ={openCloseModal} onRefetch={onRefetch}/>)
        openCloseModal()
    }

    const updateCategory = (data) => {
        setTitleModal('Actualizar categoria')
        setContentModal(
            <AddEditCategoryForm onClose={openCloseModal} onRefetch={onRefetch} category={data}/>)
            openCloseModal()
    }

    const onDeleteCategory = async(data) => {
        const result = window.confirm(`Estas seguro que desea eliminar la categoria: ${data.name}`)
        try{
            if(result){
                await deleteCategory(data._id)
                toast.success(`Categoria eliminada`)
                onRefetch()
            }
        }catch(error){
            toast.error(error.message)
        }

    }

    return (
    <>
        <HeaderPages
            title ='Categorias'
            btnTitle = 'Crear nueva Categoria'
            btnClick = {addCategory}
        />
        {
            loading
            ? (<Loader active inline='centered'>Cargando...</Loader>)
            : (<TableCategoryAdmi categories={categories} updateCategory={updateCategory} deleteCategory={onDeleteCategory}/>)
        }
        <ModalBasic
            show={showModal}
            onClose={openCloseModal}
            title={titleModal}
            children={contentModal}

        />
    </>
  )
}
