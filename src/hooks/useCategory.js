import {useState} from 'react'
import {getCategoriesApi, addCategoriesApi, updateCategoryApi, deleteCategoryApi} from '../api/category'
import {useAuth} from './'

export const useCategory = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [categories, setCategories] = useState(null)

    const {auth} = useAuth()

    const getCategories = async() => {
        try {
            setLoading(true);
            const response = await getCategoriesApi();
            setLoading(false)
            setCategories(response)
        } catch(error){
            setLoading(false)
            setError(error)
            throw error
        }
    }

    const addCategories = async(data) => {
        try{
            setLoading(true);
            await addCategoriesApi(data, auth.token)
            setLoading(false)
        }catch(error){
            setLoading(false)
            setError(error)
            throw error
        }
    }


    const updateCategory = async(id, data) => {
        try {
            setLoading(true);
            await updateCategoryApi(id, data, auth.token)
            setLoading(false)

        }catch(error){
            setLoading(false)
            setError(error)
            throw error
        }
    }

    const deleteCategory = async(id) => {
        try{
            setLoading(true);
            await deleteCategoryApi(id, auth.token )
            setLoading(false)
        }catch(error){
            setLoading(false)
            setError(error)
            throw error
        }
    }

    return {
        loading,
        error,
        categories,
        getCategories,
        addCategories,
        updateCategory,
        deleteCategory
    }

}