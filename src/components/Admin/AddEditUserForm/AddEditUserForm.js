import React from 'react'
import {Form, Button} from 'semantic-ui-react'
import {useFormik} from 'formik'
import * as Yup from 'yup';
import {useUser} from '../../../hooks'
import {toast} from 'react-toastify'
import "./AddEditUserFOrm.scss"


export function AddEditUserForm(props) {

    const {onClose, user, onRefres} = props;
    const {addUser, updateUser} = useUser();

    const formik = useFormik({
        initialValues: initialValues(user),
        validationSchema: Yup.object(user ? updateSchame() : newSchame()),
        validateOnChange: false,
        onSubmit: async(formValue) => {
            try{
                const newformValue = {
                    name: formValue.name,
                    cedula: String(formValue.cedula),
                    id_anterior: formValue.id_anterior,
                    departamento: "DOCENTES"
                }

                if(user) await updateUser(user._id, newformValue)
                else await addUser(newformValue)
                onRefres()
                onClose()
                toast.success(`Usuario ${user ?'actualizado' :'Creado'}`)
            }catch(error){
                toast.error(error.message)
            }
        }
    });

  return (
    <Form className='add-edit-user-form' onSubmit={formik.handleSubmit}>
        <Form.Input name='name' placeholder='Nombre del usuario' value={formik.values.name} error={formik.errors.name} onChange={formik.handleChange}/>
        <Form.Input name='cedula' type='number' placeholder='Cedula' value={formik.values.cedula} error={formik.errors.cedula} onChange={formik.handleChange}/>
        <Form.Input name='id_anterior' placeholder='Id anterior' value={formik.values.id_anterior} error={formik.errors.id_anterior} onChange={formik.handleChange}/>
        <Button type='submit' primary fluid content={user ? 'Actualizar' : 'Crear'}/>

    </Form>
  )
}


const initialValues = (user) => {
    return {
        name: user?.name || "",
        cedula: user?.cedula || "",
        id_anterior: user?.id_anterior || "",
        //departamento: user?.last_name || "",
    }
}

const newSchame = () => {
    return {
        name: Yup.string().required(true),
        cedula: Yup.number(true).required(true),
        id_anterior: Yup.string().required(true),
        //departamento: Yup.string().required(true),
    };
}

const updateSchame = () => {
    return {
        name: Yup.string().required(true),
        cedula: Yup.number(true).required(true),
        id_anterior: Yup.string().required(true),
        //departamento: Yup.string().required(true),
    };
}