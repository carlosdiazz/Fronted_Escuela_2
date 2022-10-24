import {BASE_API_URL} from '../config/config';

export const loginApi = async (formValues) => {
    try {
        const url = `${BASE_API_URL}/auth/login`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formValues),
        };
        const response = await fetch(url, params);

        if(response.status !== 200) {
            throw Error('Error al inciar');
        }
        const result = await response.json();
        return result.data;

    } catch (error) {
        throw error;
    }
}


export const getMeApi = async(TOKEN) => {
    try{
        const url = `${BASE_API_URL}/auth/me`;
        const params = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${TOKEN}`
            }
        };

        const response = await fetch(url, params);
        if(response.status !== 200){
            throw Error('Token no validoo')
        }
        const result = await response.json();
        return result.data;

    }catch(error){
        throw error;
    }
}

export const getUsersApi = async(token) => {
    try{
        const url = `${BASE_API_URL}/users`
        const params = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await fetch(url, params)
        const result = await response.json()
        return result.data;

    }catch(error){
        throw error
    }
}

export const addUserApi = async(data, token) => {
    try{
        //! Crear una funcion apra asignar un rol podefecto
        const url = `${BASE_API_URL}/users`
        const params = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(url, params)
        const result = await response.json()
        if(result.statusCode!==201){
            throw Error(result.message)
        }
        return result;

    }catch ( error) {
        throw error;
    }
}

export const updateUserApi = async (id, data, token) => {
    try{
        const url = `${BASE_API_URL}/users/${id}`;
        const params = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

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

export const deleteUserApi = async(id, token) => {
    try{
        const url = `${BASE_API_URL}/users/${id}`;
        const params = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        };

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