import {useState} from "react";
import {
    getReportsAPI
} from '../api/report'

export const useReports = () => {

    const [loading, setLoading]= useState(false)
    const [error, setError] = useState(null)
    const [dataReports, setDataReports]= useState([])
    //const {auth} = useAuth();

    const getDataReports = async()=> {
        try{
            setLoading(true);
            //const response = await getUsersApi(auth.token);
            const response = []
            setLoading(false);
            setDataReports(response)
        }catch(error){
            setLoading(false)
            setError(error)
        }
    }

    const getDataReportsEntidad = async(data)=> {
        try{
            setLoading(true);
            const response = await getReportsAPI(data);
            setLoading(false);
            setDataReports(response)
        }catch(error){
            setLoading(false)
            setError(error)
        }
    }



    return {
        loading,
        error,
        dataReports,
        getDataReports,
        getDataReportsEntidad
    };
};