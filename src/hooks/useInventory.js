import {useState} from 'react'
import {
    getInventorysApi
} from '../api/inventory'

export const useInventory = () => {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [inventory, setInventory] = useState(null)

    const getInventoryByTables = async () => {
        try{
            setLoading(true)
            const response = await getInventorysApi()
            setLoading(false)
            setInventory(response)

        }catch(error){
            setLoading(false)
            setError(error)
            throw error
        }
    }

    return {
        loading,
        error,
        inventory,
        getInventoryByTables
    }

}