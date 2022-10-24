import {BASE_API_URL} from '../config/config'

export const getCategoriesApi = async() => {
    try {
        const url = `${BASE_API_URL}/categories`;
        const response = await fetch(url)
        const result = await response.json()
        if(result.statusCode!==200){
            throw Error(result.message)
        }
        return result.data
    }catch(error){
        throw error
    }
}

export const addCategoriesApi = async(data, token) => {
    try{

        //const formData = new FormData();
        //formData.append('image', data.image);
        //formData.append('title', data.title);

        const new_data = {
            name: data.title,
            description: data.description,
            imgUrl: data.imgUrl
        }
        const url = `${BASE_API_URL}/categories`

        const params ={
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(new_data)
            //!body: formData
        }
        const response = await fetch(url, params);
        const result = await response.json();
        if(result.statusCode!==201){
            throw Error(result.message)
        }
        return result;
    }catch(error){
        throw error
    }
}

export const updateCategoryApi = async(id, data, token) => {
    try {
        const url =`${BASE_API_URL}/categories/${id}`
        const new_data = {
            name: data.title,
            description: data.description,
            imgUrl: data.imgUrl
        }
        const params = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(new_data)
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

export const deleteCategoryApi = async(id, token) => {
    try{
        const url = `${BASE_API_URL}/categories/${id}`
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