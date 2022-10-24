import {useState} from 'react'
import {
    getOrderByTableApi,
    checkCeliveredOrderApi,
    addOrderToTableApi,
    AddPaymentToOrderApi,
    closeOrderApi,
    getOrderByPaymentApi,
    deleteOrderByIdAPI
} from '../api/orders'

export const useOrder = () => {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [orders, setOders] = useState(null)

    const getorderByTable = async (idTable, status, ordering) => {
        try{
            setLoading(true)
            const response = await getOrderByTableApi(idTable, status, ordering)
            setLoading(false)
            setOders(response)


        }catch(error){
            setLoading(false)
            setError(error)
            throw error
        }
    }

    const checkDeliveredOrder = async (idOrder) => {
        try{
            await checkCeliveredOrderApi(idOrder)

        }catch(error){
            setLoading(false)
            setError(error)
            throw error
        }
    }

    const addOrderToTable = async(idTable, idProduct) => {
        try{
            await addOrderToTableApi(idTable, idProduct)

        }catch(error){
            setLoading(false)
            setError(error)
            throw error
        }
    }

    const addPaymentToOrder = async(idOrder, idPayment) => {
        try{
            await AddPaymentToOrderApi(idOrder, idPayment)

        }catch(error){
            setLoading(false)
            setError(error)
            throw error
        }
    }


    const closeOrder = async(idOrder) => {
        try{
            await closeOrderApi(idOrder)
        }catch(error){
            setLoading(false)
            setError(error)
            console.log(error)
        }
    }


    const getOrdersByPayment = async (idPayment) => {
        try{
            return await getOrderByPaymentApi(idPayment)
        }catch(error){
            setLoading(false)
            setError(error)
            console.log(error)
        }
    }

    const deleteOrdeById = async (idOrder) => {
        try{
            await deleteOrderByIdAPI(idOrder)
        }catch(error){
            setLoading(false)
            setError(error)
            throw error
        }
    }


    return {
        loading,
        error,
        orders,
        getorderByTable,
        checkDeliveredOrder,
        addOrderToTable,
        addPaymentToOrder,
        closeOrder,
        getOrdersByPayment,
        deleteOrdeById
    }

}