import React,{useState, useEffect} from 'react'
import {
    HeaderPages,
    ReportsEntidad,
    ModalReportsEntidad
} from '../../components/Admin'
import {useReports, useUser} from '../../hooks'
import {Loader} from 'semantic-ui-react'
import {ModalBasic} from '../../components/Common'
import { map } from 'lodash';

import jsPDF from "jspdf";
import 'jspdf-autotable';

export function ReportAdmin() {


    const {users, getUsers} = useUser()

    const [showModal, setshowModal] = useState(false)
    const {loading, dataReports, getDataReportsEntidad} = useReports()

    const [usersFormart, setusersFormart] = useState([])

    useEffect(() => {
        getUsers()
        setusersFormart(formatDropdownData2(users))

    },[showModal])

    const generatePDF = () => {
        let doc = new jsPDF('p', "pt", "a4");
        //doc.text('Reporte')
        doc.autoTable({html: '#Report2', useCss: true, })
        doc.save("reporte.pdf")
    }

    const openCloseModal = () => setshowModal((prev) => !prev)

    const generarReporte = () => {
        openCloseModal()
    }

    return (
    <>
    <HeaderPages
        title="Reportes por entidad"
        btnTitle="Generar nuevo reporte"
        btnClick={generarReporte}
        btnTitleTwo="Generar Reporte"
        btnClickTwo={generatePDF}
    />

    <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={'Reporte por entidad'}
        children={<ModalReportsEntidad
            usersFormart={usersFormart}
            getDataReportsEntidad={getDataReportsEntidad}
            openCloseModal={openCloseModal}
        />}
    />

    {
        loading ? (
            <Loader active inline='centered'>Cargando...</Loader>
        ) : (
            <ReportsEntidad
                dataReport = {dataReports}
            />
        )
    }

    </>
  )
}

const formatDropdownData2 =(data) => {
    return map(data,(item, index) => ({
        key: item?._id || index,
        text: item?.name,
        value: item?._id
    }))
}