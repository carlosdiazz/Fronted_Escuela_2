import React,{useState, useEffect} from 'react'
import {Form, Button, Dropdown} from 'semantic-ui-react';
import moment from 'moment';
import {TANDA_ENUMS} from '../../../../utils'
import { map } from 'lodash';
import {useFormik} from 'formik';
import * as Yup from 'yup';

const fecha = moment().format('YYYY-MM-DD')


export function ModalReportsEntidad(props) {

    const {usersFormart, getDataReportsEntidad, openCloseModal} = props

    const options_tanda = [TANDA_ENUMS.MATUTINA, TANDA_ENUMS.VERPERTINA]

    const [tandasFormat, setTandasFormat] = useState([])

    useEffect(() => {
        setTandasFormat(formatDropdownData(options_tanda))
    },[])

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        validateOnChange: false,
        onSubmit: (dataForm) => {
            try{
                console.log('submit')
                console.log(dataForm)
                getDataReportsEntidad(dataForm)
                openCloseModal()
            }catch(error){
                console.log(error)
            }
        }
    })


  return (
    <Form onSubmit={formik.handleSubmit}>

        <h5>Profesor:</h5>
        <Dropdown
            placeholder='Profesor'
            fluid selection search
            options={usersFormart}
            value={formik.values.profesor}
            onChange={(_,data) => formik.setFieldValue('profesor',data.value)}
            error={formik.errors.profesor}
        />

        <h5>Tanda:</h5>
        <Dropdown
            placeholder='Tanda a buscar'
            fluid selection search
            options={tandasFormat}
            value={formik.values.tanda}
            onChange={(_,data) => formik.setFieldValue('tanda',data.value)}
            error={formik.errors.tanda}
        />

        <h5>Desde:</h5>
        <Form.Input
            name="fecha_inicio"
            type='date'
            placeholder="Fecha de inicio"
            value={formik.values.fecha_inicio}
            onChange={formik.handleChange}
            error={formik.errors.fecha_inicio}
        />

        <h5>Hasta:</h5>
        <Form.Input
            name="fecha_final"
            type='date'
            placeholder="Fecha Final"
            value={formik.values.fecha_final}
            onChange={formik.handleChange}
            error={formik.errors.fecha_final}
        />

        <Button
            type='submit'
            primary fluid
            content={"Buscar"}
        />
    </Form>
  )
}


const formatDropdownData =(data) => {
    return map(data,(item, index) => ({
        key: item?._id || index,
        text: item,
        value: item
    }))
}

const initialValues = () => {
    return {
        profesor: undefined,
        tanda: undefined,
        fecha_inicio: fecha,
        fecha_final: fecha
    }
}

const validationSchema = () => {
    return {
        profesor: Yup.string(),
        tanda: Yup.string(),
        fecha_inicio: Yup.date().required(true),
        fecha_final: Yup.date().required(true)
    }
}