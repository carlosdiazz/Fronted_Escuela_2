import {useState} from 'react'
import {
    getProductsApi,
    addProductApi,
    updateProductApi,
    deleteProductApi,
    getProductApi,
    getProductsTableApi,
    getProductsByCategoryApi
} from '../api/product'
import {useAuth} from './'

export const useProduct = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [products, setProducts] = useState(null)

    const {auth} = useAuth()


    const getProducts = async() => {
        try{
            setLoading(true);
            const response = await getProductsApi()
            setLoading(false)
            setProducts(response)
        }catch(error){
            setLoading(false)
            setError(error)
            throw error
        }
    }

    const getProductsTables = async() => {
        try{
            setLoading(true);
            const response = await getProductsTableApi()
            setLoading(false)
            setProducts(response)
        }catch(error){
            setLoading(false)
            setError(error)
            throw error
        }
    }


    const addProduct = async (data) => {
        try {
            setLoading(true)
            await addProductApi(data, auth.token)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error)
            throw error
        }
    }

    const updateProduct = async (id, data) => {
        try {
            setLoading(true)
            await updateProductApi(id, data, auth.token)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error)
            throw error
        }
    }

    const updateProductInventory = async (id, stock) => {
        try {
            setLoading(true)

            const data = {
                stock:stock
            }
            await updateProductApi(id, data, auth.token)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error)
            throw error
        }
    }


    const deleteProduct = async(id) => {
        try{
            setLoading(true)
            await deleteProductApi(id, auth.token)
            setLoading(false)
        }catch (error) {
            setLoading(false)
            setError(error)
            throw error
        }
    }


    const getProductById = async(id) => {
        try{

            const product = await getProductApi(id)
            return product

        }catch (error) {
            setError(error)
            console.log(error)
            throw error
        }
    }

    const getProductByCategory = async(idCategory) => {
        try{
            setLoading(true)
            const product = await getProductsByCategoryApi(idCategory)
            setLoading(false)
            setProducts(product)

        }catch (error) {
            setError(error)
            console.log(error)
            throw error
        }
    }

    return {
        loading,
        error,
        products,
        getProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        getProductsTables,
        getProductByCategory,
        updateProductInventory
    }
}