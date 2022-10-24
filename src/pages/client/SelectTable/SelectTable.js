import React, {useState} from 'react'
import {Form, Button} from 'semantic-ui-react'
import {useTable} from '../../../hooks'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import './SelectTable.scss'

export function SelectTable(props) {

    const [tableNum, setTableNum] = useState(null)
    const [error, setError] = useState(null)
    const {isExistTable} = useTable()
    const navigate = useNavigate()

    const onSubmit = async() => {
        setError(null)
        if(!tableNum){
            setError("Npo has introducido ninguna mesa")
        }else{
            try{
                const exist = await isExistTable(tableNum)
                if(exist){
                    navigate(`/client/${tableNum}`)
                }
                toast.success("Mesa encontrada")

            }catch(error){
                console.log(error)
                toast.error(error.message)
            }

        }
    }

  return (
    <div className='select-Table'>
        <div className='select-Table__content'>
            <h1>Bienvenido al Restaurante</h1>
            <h2>Introduce el numero de mesa</h2>

            <Form onSubmit={onSubmit}>
                <Form.Input placeholder="EJEMPLO 234 653 123 002" type='number' onChange={(_, data) => setTableNum(data.value)}/>
                <Button primary fluid>
                    Entrar
                </Button>

            </Form>

            <p className='select-Table__content-error'>{error}</p>

        </div>
    </div>
  )
}
