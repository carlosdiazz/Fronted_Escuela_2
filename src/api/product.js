import {BASE_API_URL} from '../config/config'

export const getProductsApi = async () => {
    try{

        const url = `${BASE_API_URL}/products`;
        const response = await fetch(url)
        const result = await response.json()
        if(result.statusCode !== 200){
            throw Error('Error consultados los productos')
        }
        return result.data

    }catch(error){
        throw error
    }
}

export const getProductsTableApi = async () => {
    try{

        const url = `${BASE_API_URL}/products?is_active=TRUE`;
        const response = await fetch(url)
        const result = await response.json()
        if(result.statusCode !== 200){
            throw Error('Error consultados los productos')
        }
        return result.data

    }catch(error){
        throw error
    }
}

export const addProductApi = async(data, token) => {
    try{
        const newProduct = {
            name: data.name,
            description: data.description,
            price: data.price,
            img_url: data.img_url,
            is_active: data.is_active,
            id_category: data.id_category,
            stock: data.stock
        }

        const url = `${BASE_API_URL}/products`;

        const params ={
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        }

        const response = await fetch(url, params)
        const result = await response.json()

        if(result.statusCode!==201){
            throw Error(result.message)
        }
        return result;
    }catch(error) {
        throw error
    }
}

export const updateProductApi = async(id, data, token) => {
    try{
        const newProduct = {
            name: data.name,
            description: data.description,
            price: data.price,
            img_url: data.img_url,
            is_active: data.is_active,
            id_category: data.id_category,
            stock: data.stock
        }

        const url = `${BASE_API_URL}/products/${id}`;

        const params ={
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        }

        const response = await fetch(url, params)
        const result = await response.json()

        if(result.statusCode!==200){
            throw Error(result.message)
        }
        return result;
    }catch(error) {
        throw error
    }
}

export const deleteProductApi = async(id, token) => {
    try{
        const url = `${BASE_API_URL}/products/${id}`
        const params = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const response = await fetch(url, params);
        const result = await response.json()
        if(result.statusCode!==200){
            throw Error(result.message)
        }
        return result;
    }catch(error){
        throw error
    }
}

export const getProductApi = async (id) => {
    try{

        const url = `${BASE_API_URL}/products/${id}`;
        const response = await fetch(url)
        const result = await response.json()
        if(result.statusCode !== 200){
            throw Error('Error consultando un producto')
        }
        return result.data

    }catch(error){
        throw error
    }
}

export const getProductsByCategoryApi = async (idCategory) => {
    try{
        const filterActive = "is_active=TRUE"
        const filterCategory = `id_category=${idCategory}&${filterActive}`

        const url = `${BASE_API_URL}/products?${filterCategory}`;
        const response = await fetch(url)
        const result = await response.json()
        if(result.statusCode !== 200){
            throw Error('Error consultados los productos')
        }
        return result.data

    }catch(error){
        throw error
    }
}