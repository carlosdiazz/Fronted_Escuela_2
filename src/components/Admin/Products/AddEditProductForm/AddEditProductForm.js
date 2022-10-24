import { map } from 'lodash';
import React, {useEffect, useState} from 'react';
import {Form, Button, Dropdown, Checkbox} from 'semantic-ui-react';
import {useCategory, useProduct} from '../../../../hooks';
import {useFormik} from 'formik';
import {toast} from 'react-toastify'
import * as Yup from 'yup'
import './AddEditProductForm.scss'


export function AddEditProductForm(props) {

    const {onClose, onRefetch, product} = props

    const [categoriesFormat, setCategoriesFormat ] = useState([])
    const {categories, getCategories} = useCategory()

    const {addProduct, updateProduct} = useProduct()

    useEffect(() => {
        try{
            getCategories()
        }catch(error){
            console.log(error)
        }
      }, [])

    useEffect(() => {
        setCategoriesFormat(formatDropdownData(categories))
    }, [categories]
    )


    const formik = useFormik({
        initialValues: initialValues(product),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try{
                if(product) await updateProduct(product._id, formValue)
                else
                await addProduct(formValue)
                toast.success(`Producto ${product ?'actualizado' :'Creado'}`)
                onRefetch()
                onClose()

            }catch(error){
                toast.error(error.message)
                console.log(error)
            }
        }
    })


  return (
    <Form className='add-edit-product-form' onSubmit={formik.handleSubmit}>

        <Form.Input
            name='name'
            placeholder='Nombre del producto'
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.errors.name}
        />

        <Form.Input
            name='description'
            placeholder='Descripcion del producto'
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.errors.description}
        />

        <Form.Input
            type='number'
            name='price'
            placeholder='Precio'
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.errors.price}
        />

        <Form.Input
            type='number'
            name='stock'
            placeholder='Stock del producto'
            value={formik.values.stock}
            onChange={formik.handleChange}
            error={formik.errors.stock}
        />

        <Dropdown
            placeholder='Categoria'
            fluid selection search
            options={categoriesFormat}
            value={formik.values.id_category}
            error={formik.errors.id_category}
            onChange = {(_, data) => formik.setFieldValue('id_category', data.value)}
        />

        <div className='add-edit-product-form__active'>
            <Checkbox
                toggle
                checked={formik.values.is_active}
                onChange = {(_,data)=>formik.setFieldValue('is_active', data.checked)}
            /> Producto activo
        </div>

        <Form.Input
            name='img_url'
            placeholder='Url de la imagen del producto'
            value={formik.values.img_url}
            onChange={formik.handleChange}
            error={formik.errors.img_url}
        />

        <Button
            type='submit'
            primary fluid
            content={product ? "Actualizar producto" : "Crear producto"}
        />

    </Form>
  )
}


const formatDropdownData = (data) => {
    return map(data,(item, index) => ({
        key: item?._id || index,
        text: item?.name || 'No hay',
        value: item?._id || null
    }))
}


const initialValues = (data) => {
    return {
        name : data?.name || '',
        description: data?.description || '',
        price: data?.price || '',
        id_category: data?.id_category?._id ||'',
        stock: data?.stock || '',
        is_active: data?.is_active === false ? false : true,
        img_url: data?.img_url || ''
    }
}

const newSchema = () => {
    return {
        name: Yup.string().required(true),
        description: Yup.string().required(true),
        price: Yup.number().required(true),
        id_category: Yup.string().required(true),
        stock: Yup.number().required(true),
        is_active: Yup.boolean().required(true),
        img_url: Yup.string().url().required(true)
    }
}