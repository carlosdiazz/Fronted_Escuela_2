import React,{useState} from 'react'
import {Table, Search} from 'semantic-ui-react'
import {map} from 'lodash'
import moment from 'moment'

import './TableInventoryHistory.scss'

export function TableInventoryHistoryAdmin(props) {

    const {inventarios} = props

    const [searchProduct, setSearchProduct] = useState('')

    const cambiar_input_Product = (value) => {
        setSearchProduct(value.target.value)
    }

    const [searchMovimiento, setsearchMovimiento] = useState('')

    const cambiar_input_Movimiento = (value) => {
        setsearchMovimiento(value.target.value)
    }

    return (
        <>

        <Table>
            <Table.Header>
                <Table.Row>
                  <Table.HeaderCell textAlign='left' width={1}>
                    <Search value={searchProduct} showNoResults={false} onSearchChange={cambiar_input_Product}  placeholder="Filtrar por productos" />
                  </Table.HeaderCell>
                  <Table.HeaderCell >
                    <Search value={searchMovimiento} width={1} textAlign='left' showNoResults={false} onSearchChange={cambiar_input_Movimiento}  placeholder="Filtrar por Movimientos" />
                  </Table.HeaderCell>

                </Table.Row>
              </Table.Header>
        </Table>

        <div id="content">
        <h3>Historial de Inventarios </h3>
        <Table className='table-payments-admin' color='green'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Id</Table.HeaderCell>
                    <Table.HeaderCell>Producto</Table.HeaderCell>
                    <Table.HeaderCell>Movimiento</Table.HeaderCell>
                    <Table.HeaderCell>Tipo de Movimiento</Table.HeaderCell>
                    <Table.HeaderCell>Fecha</Table.HeaderCell>
                </Table.Row>
            </Table.Header>


            <Table.Body>
            {
                map(inventarios, (inventario, index) =>
                    inventario?.id_product?.name.includes(searchProduct) ?
                    inventario?.tipo_movimiento.includes(searchMovimiento) ?
                    (
                    <Table.Row key={index}>
                        <Table.Cell>{inventario._id}</Table.Cell>
                        <Table.Cell>{inventario?.id_product?.name}</Table.Cell>
                        <Table.Cell>{inventario.movimiento}</Table.Cell>
                        <Table.Cell>{inventario.tipo_movimiento}</Table.Cell>
                        <Table.Cell>{moment(inventario.createdAt).format("DD/MM/YYYY - LT")}</Table.Cell>

                    </Table.Row>
                ):null:null)
            }
        </Table.Body>

        </Table>

        </div>
        </>
      )
}
