import React, {useEffect, useState} from 'react'
import {HeaderPages, TableUser, AddEditUserForm} from '../../components/Admin'
import {useUser} from '../../hooks/'
import { Loader } from 'semantic-ui-react';
import {ModalBasic} from '../../components/Common'
import {toast} from 'react-toastify'
import jsPDF from "jspdf";

export  function UsersAdmin() {


  const [titleModal, setTitleModal] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [contentModal, setContenModal] = useState(null)

  const [refres, setRefres]=useState(false)

  const {loading, users, getUsers, deleteUser} = useUser();
  
  useEffect(() => {
    getUsers();

  }, [refres])

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefres = () => setRefres((prev) => !prev);
  

  const addUser = () => {
    setTitleModal('Nuevo Personal')
    setContenModal(<AddEditUserForm onClose={openCloseModal} onRefres={onRefres}/>)
    openCloseModal()
  }

  const updateUser = (data) => {
    setTitleModal('Actualizar Personal')
    setContenModal(<AddEditUserForm onClose={openCloseModal} user={data} onRefres={onRefres}/>)
    openCloseModal()
  }

  const generatePDF = () => {
    let doc = new jsPDF('p',"pt","a4");
    doc.autoTable({html: '#Report'})
    doc.save("reporte.pdf")
}

  const onDeleteUser = async (data) => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm(`Estas seguro que deseas eliminar el usuario: ${data.first_name}`);

    if(result){
      try {
        await deleteUser(data._id)
        toast.success(`Usuario eliminado`)
        onRefres()
      }catch(error){
        toast.error(error.message)
    }
    }
  }

    return (
    <>
        <HeaderPages
          title="Usuarios"
          btnTitle='Nuevo personal'
          btnClick={addUser}
          btnTitleTwo='Generar Reporte'
          btnClickTwo={generatePDF}
        />
        {loading ? (
            <Loader active inline='centered'>Cargando</Loader>
        ): (
            <TableUser users={users} updateUser={updateUser} onDeleteUser={onDeleteUser}/>
        )
        }
        <ModalBasic show={showModal} title={titleModal} children={contentModal} onClose={openCloseModal}/>
    </>
  )
}
