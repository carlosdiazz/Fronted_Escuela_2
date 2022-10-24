import {useState} from 'react';
import {size} from'lodash'
import {
    getTablesApi,
    addTableApi,
    updateTableApi,
    deleteTableApi,
    getTableApi,
    getTablesByNumberApi
} from '../api/table';
import {useAuth} from './';

export const useTable = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tables, setTables] = useState(null);
    const [table, setTable] = useState(null);


    const {auth} = useAuth()

    const getTables = async() => {
        try{
            setLoading(true);
            const response = await getTablesApi(auth.token);
            setLoading(false);
            setTables(response);
        }catch(error){
            setLoading(false);
            setError(error);
            throw error
        }
    }

    const getTable = async(id) => {
        try{
            setLoading(true);
            const response = await getTableApi(id, auth.token);
            setLoading(false);
            setTable(response);
        }catch(error){
            setLoading(false);
            setError(error);
            throw error
        }
    }

    const addTable = async(data) => {
        try{
            setLoading(false);
            await addTableApi(data, auth.token);
            setLoading(false);
        }catch(error){
            setLoading(false);
            setError(error);
            throw error;
        }
    }

    const updatetable = async(id, data) => {
        try{
            setLoading(false)
            await updateTableApi(id, data, auth.token)
            setLoading(false);
        }catch(error){
            setLoading(false);
            setError(error);
            throw error;
        }
    }

    const deleteTable = async(id) => {
        try{
            setLoading(true);
            await deleteTableApi(id, auth.token )
            setLoading(false)
        }catch(error){
            setLoading(false)
            setError(error)
            throw error
        }
    }

    const isExistTable = async(tableNumber) => {
        try{
            const response = await getTablesByNumberApi(tableNumber)
            if(size(response) === 0) throw Error('Esta mesa no existe');
            return true;

        }catch(error){
            setLoading(false)
            setError(error)
            throw error
        }
    }

    const getTableByNumber = async(tableNumber) => {
        try{
            const response = await getTablesByNumberApi(tableNumber)
            return response;

        }catch(error){
            setLoading(false)
            setError(error)
            throw error
        }
    }

    return {
        loading,
        error,
        tables,
        table,
        getTables,
        addTable,
        updatetable,
        deleteTable,
        getTable,
        isExistTable,
        getTableByNumber
    }

}