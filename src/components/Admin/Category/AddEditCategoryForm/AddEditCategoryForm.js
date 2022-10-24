import React,{useState,useCallback} from 'react';
import {Form, Image, Button} from 'semantic-ui-react';
//import {useDropzone} from 'react-dropzone';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useCategory} from '../../../../hooks'
import {toast} from 'react-toastify'
import './AddEditCategoryForm.scss'

export function AddEditCategoryForm(props) {

    //const [previewImage, setPreviewImage] = useState(null)

    const {addCategories, updateCategory} = useCategory();

    const {onClose, onRefetch, category} = props


    const formik = useFormik({
        initialValues:initialValues(category),
        validationSchema: Yup.object(newChema()),
        validateOnChange: false,
        onSubmit: async(formValue) => {
            try{
                if(category) await updateCategory(category._id, formValue)
                else
                await addCategories(formValue)
                toast.success(`Categoria ${category ?'actualizada' :'Creada'}`)
                onRefetch()
                onClose()

            }catch(error){
                toast.error(error.message)
                console.log(error)
            }
        }
    })

  return (
    <Form
        className='add-edit-category-form' onSubmit={formik.handleSubmit}>
            <Form.Input
                name='title'
                placeholder='Nombre de la categoria'
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.errors.title}
            />


            <Form.Input
                name='description'
                placeholder='Descripcion de la categoria'
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.errors.description}
            />

            <Form.Input
                name='imgUrl'
                placeholder='Url de la imagen'
                value={formik.values.imgUrl}
                onChange={formik.handleChange}
                error={formik.errors.imgUrl}
            />

            <Button type='submit' primary fluid content={category ? 'Actualizar' : 'Crear'}/>

        </Form>
  )
}


const initialValues = (data) => {
    return {
        title: data?.name || '',
        description: data?.description ||'',
        imgUrl: data?.imgUrl || ''
    }
}

const newChema = () => {
    return {
        title: Yup.string().required(true),
        description: Yup.string().required(true),
        imgUrl: Yup.string().url().required(true)
    }
}