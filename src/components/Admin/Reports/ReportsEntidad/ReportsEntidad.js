import React from 'react'
import {Table} from 'semantic-ui-react'
import {map} from 'lodash'
import moment from 'moment'

export function ReportsEntidad(props) {

  const {dataReport} = props

  return (
    <>
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Fecha</Table.HeaderCell>
          <Table.HeaderCell>Tanda</Table.HeaderCell>
          <Table.HeaderCell>Total hora</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {
          map(dataReport,(data, index) => (
            <Table.Row key={index}>
              <Table.Cell>{data?.id_user.name}</Table.Cell>
              <Table.Cell>{moment(data?.date).format('YYYY-MM-DD')}</Table.Cell>
              <Table.Cell>{data.tanda}</Table.Cell>
              <Table.Cell>{data.total_hora}</Table.Cell>
            </Table.Row>
          ))
        }
      </Table.Body>
    </Table>
    </>
  )
}
