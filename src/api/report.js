import {BASE_API_URL} from '../config/config'


const filter = (data) => {
    let filter =''
    const fecha_inicio = data.fecha_inicio
    const fecha_final = data.fecha_final
    const id_profesor = data.profesor

    if(fecha_inicio){
        filter += `date_inicial=${fecha_inicio}`
    }
    if(fecha_final){
        filter += `&date_final=${fecha_final}`
    }
    if(id_profesor){
        filter += `&id_user=${id_profesor}`
    }

    return filter
}


export const getReportsAPI = async(data) => {
    try{

        const filtro = filter(data)
        const url = `${BASE_API_URL}/registro?${filtro}`;
        console.log(url)
        const response = await fetch(url)
        const result = await response.json()
        if(result.statusCode!==200){
            throw Error(result.message)
        }
        return result.data
    }catch(error){
        console.log(error)
    }
}