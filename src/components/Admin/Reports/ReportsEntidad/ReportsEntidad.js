import React,{useState} from 'react'
import {Search, Table} from 'semantic-ui-react'
import {map, size} from 'lodash'
import moment from 'moment'
import {TANDA_ENUMS} from '../../../../utils/constansts'
import './ReportsEntidad.css'

export function ReportsEntidad(props) {

  let profesores = []
  let profesores_colores = []
  const {dataReport} = props
  const [filterTanda, setfilterTanda] = useState('')
  const [filterProfesor, setfilterProfesor] = useState('')

  const cambiar_input_search_tanda = (value) => {
    setfilterTanda(value.target.value)
  }

  const cambiar_input_search_profesor = (value) => {
    setfilterProfesor(value.target.value)
  }

  const imprimir_name_profesor = (data) => {
    if(profesores.includes(data)){
      return null
    }else{
      profesores.push(data)
      return data
    }
  }

  const imprimir_color_profesor = (data) => {
    if(profesores_colores.includes(data)){
      return false
    }else{
      profesores_colores.push(data)
      return true
    }
  }

  return (
    <>
    <Table color='green'>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell textAlign='left' width={1}>
            <Search value={filterTanda} showNoResults={false} onSearchChange={cambiar_input_search_tanda}  placeholder="Filtrar por Tanda" />
          </Table.HeaderCell>
          <Table.HeaderCell textAlign='left'>
            <Search value={filterProfesor} showNoResults={false} onSearchChange={cambiar_input_search_profesor}  placeholder="Filtrar por Profesor" />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    </Table>

    <Table color='blue' id="Report2">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Fecha</Table.HeaderCell>
          <Table.HeaderCell>Tanda</Table.HeaderCell>
          <Table.HeaderCell>Hora entrada</Table.HeaderCell>
          <Table.HeaderCell>Hora salida</Table.HeaderCell>
          <Table.HeaderCell>Total hora</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {
          size(dataReport) >0 ?
          map(dataReport,(data, index) =>
          data.tanda.includes(filterTanda) ?
          data.id_user.name.includes(filterProfesor) ?
          (
            <Table.Row key={index} positive={imprimir_color_profesor(data.id_user.name)}>
              <Table.Cell width={2}>{imprimir_name_profesor(data.id_user.name)}</Table.Cell>
              <Table.Cell>{moment(data.date).format('YYYY-MM-DD')}</Table.Cell>
              <Table.Cell>{data.tanda}</Table.Cell>
              <Table.Cell negative={ data.tanda === TANDA_ENUMS.MATUTINA
                ? moment(data.hora_entrada).hour() >= 8 ? true : false
                : moment(data.hora_entrada).hour() >= 14 ? true : false
            } >
                {moment(data.hora_entrada).format('LT')}
              </Table.Cell>
              <Table.Cell negative={ data.tanda === TANDA_ENUMS.MATUTINA
                ? 12 <= moment(data.hora_salida).hour() ? false : true
                : 17 <= moment(data.hora_salida).hour() ? false : true
              }>
                {moment(data.hora_salida).format('LT')}
              </Table.Cell>
              <Table.Cell negative={data.total_hora <3}>
                {data.total_hora}
              </Table.Cell>
            </Table.Row>

          ): null : null) :
          <Table.Row>
            <Table.Cell>No hay data aun</Table.Cell>
          </Table.Row>
        }
      </Table.Body>
    </Table>
    </>
  )
}
