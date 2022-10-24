import React from 'react'
import {Form, Button} from 'semantic-ui-react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import './AddEditTableForm.scss'
import {toast} from 'react-toastify'
import {useTable} from '../../../../hooks'

export function AddEditTableForm(props) {

    const {onClose, onRefetch, table} = props;
    const {addTable, updatetable} = useTable()

    const formik = useFormik({
        initialValues: initialValues(table),
        validationSchema: Yup.object(validationSchema()),
        validateOnChange: false,
        onSubmit: async(formValue) => {
            try{
                if(table) await updatetable(table._id, formValue)
                else
                await addTable(formValue)
                toast.success(`Mesa ${table ? 'actualizada':"creada"}`)
                onRefetch()
                onClose()

            }catch(error){
                toast.error(error.message)
                console.log(error)
            }
    }})


  return (
    <Form className='add-edit-table-form' onSubmit={formik.handleSubmit}>
        <Form.Input
            name='name'
            placeholder='Nombre de la mesa'
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.errors.name}
        />
        <Form.Input
            name='number'
            type='number'
            placeholder='Numero de la mesa'
            value={formik.values.number}
            onChange={formik.handleChange}
            error={formik.errors.number}
        />
        <Button type='submit' primary fluid content={table ? 'Actualizar' : 'Crear'} />
    </Form>
  )
}


const initialValues = (table) => {
    return {
        name: table?.name || '',
        number: table?.number ||''
    }
}


const validationSchema = () => {
    return {
        name: Yup.string().required(true),
        number: Yup.number().required(true)
    }
}