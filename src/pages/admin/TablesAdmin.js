import React,{useEffect, useState} from 'react'
import {Loader} from 'semantic-ui-react'
import {HeaderPages, TableTablesAdmin, AddEditTableForm} from '../../components/Admin'
import {useTable} from '../../hooks'
import {ModalBasic} from '../../components/Common'
import {toast} from 'react-toastify'

export function MesasAdmin() {

  const [showModal, setShowModal] = useState(false)
  const [titleModal, setTitleModal] = useState(null)
  const [contentModal, setContentModal] = useState(null)
  const [refetch, setRefetch] = useState(false)

  const {loading, tables, getTables, deleteTable} = useTable()
  const openCloseModal = () => setShowModal((prev) => !prev)
  const onRefetch = () => setRefetch((prev) => !prev)

  useEffect(() => {
    getTables()
  }, [refetch])

  const addTable = () => {
    setTitleModal("Crear Mesa")
    setContentModal(<AddEditTableForm onClose={openCloseModal} onRefetch={onRefetch}/>)
    openCloseModal()
  }

  const updateTable = (data) => {
    setTitleModal('Actualziar Mesa')
    setContentModal(<AddEditTableForm onClose={openCloseModal} onRefetch={onRefetch} table={data}/>)
    openCloseModal()
  }

  const onDeleteTables = async(data) => {
    const result = window.confirm(`Estas seguro que desea elimiar la mesa #: ${data.number}`)
    try{
      if(result){
        await deleteTable(data._id)
        toast.success(`Mesa eliminada`)
        onRefetch()
    }}catch(error){
      console.log(error)
      toast.error(error.message)
    }

}


  return (
    <>
      <HeaderPages title="Mesas" btnTitle="Crear nueva mesa" btnClick={addTable}></HeaderPages>
      {
        loading
        ? (<Loader active inline='centered'>Cargando...</Loader>)
        : (<TableTablesAdmin tables={tables} updateTable={updateTable} deleteTables={onDeleteTables}/>)
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
