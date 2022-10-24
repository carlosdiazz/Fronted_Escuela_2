import {useState} from 'react'
import {
    createPaymentApi,
    getPaymentByTableApi,
    closePaymentApi,
    getPaymentsApi
} from '../api/payment'



export const usePayment = () => {

    const [error, setError]=useState(null)
    const [loading, setLoading] = useState(false)
    const [payments, setPayments] = useState(null)


    const createPayment = async(paymentData) => {
        try{
            return await createPaymentApi(paymentData,'')
        }catch (error) {
            setError(error)
            console.log(error)
            throw error
        }
    }

    const getPaymentByTable = async(idTable) => {
        try{
            if(idTable){
                return await getPaymentByTableApi(idTable,'')
            }
            return idTable
        }catch (error) {
            setError(error)
            console.log(error)
            //throw error
        }
    }

    const closePayment = async(idPayment) => {
        try {
            await closePaymentApi(idPayment, "")
        }catch (error) {
            setError(error)
            throw error
        }
    }

    const getPayments = async() => {
        try{
            setLoading(true)
            const response = await getPaymentsApi('')
            setLoading(false)
            setPayments(response)

        }catch (error) {
            setLoading(false)
            setError(error)
            throw error
        }
    }

    return {
        error,
        loading,
        payments,
        createPayment,
        getPaymentByTable,
        closePayment,
        getPayments
    }
}