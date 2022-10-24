import React,{useEffect} from 'react'
import {useTable} from '../../hooks'
import {useParams, useNavigate, Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import {Container, Button, Icon } from 'semantic-ui-react'
import './ClientLayout.scss'

export function ClientLayout(props) {
  const {children } = props
  const {isExistTable} = useTable()
  const {tableNumber} = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    (async() => {
      try{
        const exist = await isExistTable(tableNumber);
        if(!exist) closeTable();
      }catch(error){
        toast.error(error.message)
        closeTable()
        console.log(error)
      }
    })()

  }, [tableNumber])
  
  const closeTable = () => {
    navigate("/")
  }

  const goToCart = () => {
    navigate(`/client/${tableNumber}/cart`)
  }

  const goToOrders = () => {
    navigate(`/client/${tableNumber}/orders`)
  }


  return (
    <div className='client-layout-gb'>
      <Container className='client-layout'>
          <div className='client-layout__header'>
            <Link to={`/client/${tableNumber}`}>
              <h1>Restaurante</h1>
            </Link>
            <span> #{tableNumber} </span>
            <div>
              <Button icon onClick={goToCart}>
                <Icon name ='shop'/>
              </Button>
              <Button icon onClick={goToOrders}>
                <Icon name ='list'/>
              </Button>
              <Button icon onClick={closeTable}>
                <Icon name ='sign-out'/>
              </Button>
            </div>
          </div>
          <div className='client-layout__content'>
          {children}
          </div>
      </Container>
    </div>
  )
}
