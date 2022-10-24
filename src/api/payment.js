import {BASE_API_URL} from '../config/config'
import {PAYMENT_STATUS} from '../utils/constansts'

export const createPaymentApi = async(paymentData,token) => {
    try{

        const url = `${BASE_API_URL}/payment`

        const params ={
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(paymentData)
        }
        const response = await fetch(url, params);
        const result = await response.json();
        if(result.statusCode!==201){
            throw Error(result.message)
        }
        return result.data;
    }catch(error){
        throw error
    }
}

export const getPaymentByTableApi = async(idTable,token) => {
    try{

        const tableFilter = `id_table=${idTable}`
        const statusFilter = `status_Payment=${PAYMENT_STATUS.PENDING}`

        const url = `${BASE_API_URL}/payment?${tableFilter}&${statusFilter}`

        const params = {
            method: 'Get',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        }
        const response = await fetch(url, params);
        const result = await response.json();
        if(result.statusCode!==200){
            throw Error(result.message)
        }
        return result.data;
    }catch(error){
        throw error
    }
}

export const closePaymentApi = async(idPayment, token) => {
    try{

        const url = `${BASE_API_URL}/payment/${idPayment}`

        const params = {
            method: 'Put',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status_Payment: PAYMENT_STATUS.PAID
            })
        }
        const response = await fetch(url, params);
        const result = await response.json();
        if(result.statusCode!==200){
            throw Error(result.message)
        }
        return result.data;


    }catch(error){
        throw error
    }
}

export const getPaymentsApi = async(token) => {
    try{

        const statusFilter = `status_Payment=${PAYMENT_STATUS.PAID}`
        const orderingFilter = `orderCreated_At=ASC`

        const url = `${BASE_API_URL}/payment?${statusFilter}&${orderingFilter}`

        const params = {
            method: 'Get',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },

        }
        const response = await fetch(url, params);
        const result = await response.json();
        if(result.statusCode!==200){
            throw Error(result.message)
        }
        return result.data;


    }catch(error){
        throw error
    }
}