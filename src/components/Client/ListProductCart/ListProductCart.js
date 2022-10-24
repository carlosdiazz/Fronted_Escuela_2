import React,{useState, useEffect} from 'react'
import {Image, Button, Icon} from 'semantic-ui-react'
import {map, forEach} from 'lodash'
import {useParams, useNavigate} from 'react-router-dom'
import {useOrder, useTable} from "../../../hooks"
import {removeProductCartApi, clearProductCartApi} from "../../../api/cart"
import {toast} from 'react-toastify'
import './ListProductCart.scss'

export function ListProductCart(props) {

    const [total, setTotal] = useState(0)

    const {products, onReloadCart} = props
    const {addOrderToTable} = useOrder()

    const {getTableByNumber} = useTable()

    const {tableNumber} = useParams()
    const navigate = useNavigate()

    const removePdouct = (index) => {
        removeProductCartApi(index)
        onReloadCart()
    }

    const createOrder = async () => {
        try{
            const tableData = await getTableByNumber(tableNumber)
            const data = tableData[0]
            const idtable = data._id
            for await(const product of products) {
                await addOrderToTable(idtable, product._id)
            }
            clearProductCartApi()
            toast.success("Productos pedidos correctamente")
            navigate(`/client/${tableNumber}`)
            //onReloadCart()
        }catch(error){
            console.log(error)
            toast.error(error.message)
        }

    }

    useEffect(() => {
        let totalTemp = 0;
        forEach(products, (product) => {
            totalTemp += Number(product.price)
        })
        setTotal(totalTemp)
    }, [products])

  return (
    <div className='list-product-cart'>
        {
            map(products, (product, index) => (
                <div key={index} className='list-product-cart__product'>
                    <div>
                        <Image src={product.img_url} size='tiny'/>
                        <span>{product.name.substring(0,15)}</span>
                    </div>
                    <span>{product.price}</span>
                    <Icon name='close' onClick={() => removePdouct(index)} />
                </div>
        ))}

        <Button primary fluid onClick={createOrder}>
                Realizar pedido ({total} $RD)
        </Button>
    </div>
  )
}
