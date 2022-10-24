import React,{useEffect, useState} from 'react';
import {Form, Image, Button, Dropdown} from 'semantic-ui-react';
import {useProduct, useOrder} from "../../../../hooks"
import {map} from 'lodash'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {toast} from 'react-toastify'
import './AddOrderForm.scss'

export function AddOrderForm(props) {

    const [productsFormat, setProductsFormat ] = useState([])
    const [productsData, setProductsData] =useState([])

  const {idTable, openCloseModal, onReloadOrders} = props
  const {products, getProductsTables, getProductById} = useProduct()
  const {addOrderToTable} = useOrder()

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        validateOnChange: false,
        onSubmit: async(data) => {
            try{
                for await(const idProduct of data.products) {
                    await addOrderToTable(idTable, idProduct)
                }
                onReloadOrders()
                openCloseModal()
                toast.success("Productos Anadidos")
            }catch(error){
                console.log(error)
                toast.error(error.message)
                //!Anadir notificaciones
            }
        }
    })

    useEffect(()=>{
        addProductList()
    },[formik.values])


    const addProductList = async() => {
        try{
            const productsId = formik.values.products;

            const arrayTemp = [];
            for await (const idProduct of productsId){
                const response = await getProductById(idProduct)
                arrayTemp.push(response)
            }
            setProductsData(arrayTemp)

        }catch(error){
            toast.error(error.message)
            console.log(error)
        }
    }


    //!Anadir notificaciones
    useEffect(() => {
        try{
            //!Cambiar
            getProductsTables()
        }catch(error){
            toast.error(error.message)
            console.log(error)
        }
    }, [])

    useEffect(() => {
        setProductsFormat(formartDropDownData(products))
    }, [products])


    const removeProductList = (index) => {
        const idProducts = [...formik.values.products];
        idProducts.splice(index,1)
        formik.setFieldValue("products", idProducts)
    }


    return (
    <Form className='add-order-form' onSubmit={formik.handleSubmit}>
        <Dropdown
            placeholder='Productos'
            fluid selection search
            options={productsFormat}
            value={null}
            onChange={(_,data) => formik.setFieldValue("products",[...formik.values.products, data.value])}
        />

        <div className='add-order-form__list'>
            {
                map(productsData, (product, index) => (
                    <div className='add-order-form__list-product' key={index}>
                            <div>
                                <Image src={product.img_url} avatar size='tiny'/>
                                <span>{product.name}</span>
                            </div>
                        <Button type='button' content="Eliminar" basic color='red' onClick={() => removeProductList(index)}/>
                    </div>
                ))
            }
        </div>

        <Button type='submit' content="Anadir productos a la mesa" primary fluid />

    </Form>
  )
}


const formartDropDownData = (data) => {
    return map(data, (item) => ({
        key: item._id,
        text: item.name,
        value: item._id
    }))
}

const initialValues = () => {
    return {
        products: []
    }
}

const validationSchema = () => {
    return {
        products: Yup.array().required(true)
    }
}