import {BASE_API_URL} from '../config/config'
import {ORDER_Status} from '../utils/constansts'

export const getOrderByTableApi = async(idTable, status="", ordering="") => {
    try{

        let statusFilter;
        if(status === "PENDING")        { statusFilter=`status=${status}`}
        else if (status ==="DELIVERED") { statusFilter=`status=${status}`}
        else statusFilter = ""

        const tableFilter = `id_table=${idTable}`;

        const closeFilter = `close=False`

        const url = `${BASE_API_URL}/order/?${tableFilter}&${statusFilter}&${closeFilter}&${ordering}`;
        const response = await fetch(url);
        const result = await response.json();
        if(result.statusCode !== 200){
            throw Error(result.message)
        }
        return result.data

    }catch(error){
        throw error;
    }
}


export const checkCeliveredOrderApi = async(id) => {
    try{

        const url = `${BASE_API_URL}/order/${id}`

        const params ={
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status : ORDER_Status.DELIVERED
            })
        };
        const response = await fetch(url, params)
        const result = await response.json()
        if(result.statusCode!==200){
            throw Error(result.message)
        }
        return result.data

    }catch(error){
        throw error;
    }
}

export const addOrderToTableApi =async(id_table, id_product) => {
    try{

        const url = `${BASE_API_URL}/order`

        const params = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status : ORDER_Status.PENDING,
                id_table : id_table,
                id_product : id_product,
                close: false
            })
        };
        const response = await fetch(url, params)
        const result = await response.json()
        if(result.statusCode!==201){
            throw Error(result.message)
        }
        return result.data

    }catch(error){
        throw error;
    }
}


export const AddPaymentToOrderApi = async(idOrder, idPayment) => {
    try{
        const url = `${BASE_API_URL}/order/${idOrder}`
        const params = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id_payment: idPayment
            })
        };
        const response = await fetch(url, params)
        const result = await response.json()
        if(result.statusCode!==200){
            throw Error(result.message)
        }
        return result.data
    }catch(error){
        throw error;
    }
}

export const closeOrderApi = async(idOrder) => {
    try{
        const url = `${BASE_API_URL}/order/${idOrder}`
        const params = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                close: true
            })
        };
        const response = await fetch(url, params)
        const result = await response.json()
        if(result.statusCode!==200){
            throw Error(result.message)
        }
        return result.data
    }catch(error){
        throw error;
    }
}


export const getOrderByPaymentApi = async(idPayment) =>{
    try{
        const paymentFilter = `id_payment=${idPayment}`;

        const url = `${BASE_API_URL}/order/?${paymentFilter}`;

        const response = await fetch(url);
        const result = await response.json();
        if(result.statusCode !== 200){
            throw Error(result.message)
        }
        return result.data
    }catch(error){
        throw error;
    }
}

export const deleteOrderByIdAPI = async(idTable) => {
    try{

        const url = `${BASE_API_URL}/order/${idTable}`;
        const params = {
            method: 'DELETE',
        };
        const response = await fetch(url, params);
        const result = await response.json();
        if(result.statusCode !== 200){
            throw Error(result.message)
        }
        return result.data

    }catch(error){
        throw error;
    }
}