import React, {useState} from 'react'
import {Table, Button, Icon} from 'semantic-ui-react'
import {map} from 'lodash'
import {ModalBasic} from '../../../Common'
import QRcode from 'qrcode.react'
import './TableTablesAdmin.scss'

export function TableTablesAdmin(props) {


  const [showModal, setShowModal] = useState(false)
  const [contentModal, setContentModal] = useState(null)

  const openCloseModal = () => setShowModal((prev) => !prev)

  const showQr = (table) => {
    const url  = `${window.location.origin}/client/${table.number}`
    setContentModal(
      <div style={{textAlign : "center"}}>
        <QRcode value={url} />
      </div>
    );
    openCloseModal()
  }

  const {tables, updateTable, deleteTables} = props

  return (
    <>
    <Table className='table-tables-admin' color='teal'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nombre mesa</Table.HeaderCell>
            <Table.HeaderCell>Numero de mesa</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

      <Table.Body>
        {
          map(tables, (table, index) => (
            <Table.Row key={index}>
                <Table.Cell>{table.name}</Table.Cell>
                <Table.Cell>{table.number}</Table.Cell>
                <Actions table={table} updateTable={updateTable} deleteTables={deleteTables} showQr={showQr} ></Actions>
            </Table.Row>
          ))
        }
      </Table.Body>
    </Table>
      <ModalBasic
        show = {showModal}
        onClose = {openCloseModal}
        title = "Codigo Qr"
        size = 'mini'
        children = {contentModal}
      />
    </>
  )
}


const Actions = (props) => {
  const {table, updateTable, deleteTables, showQr} = props
  return (
    <Table.Cell textAlign='right'>
      <Button icon onClick={() => showQr(table)}>
        <Icon name='qrcode'/>
      </Button>
      <Button icon onClick={() => updateTable(table)}>
        <Icon name='pencil'/>
      </Button>

      <Button icon negative onClick={() => deleteTables(table)}>
        <Icon name='close'/>
      </Button>
    </Table.Cell>
  )


}