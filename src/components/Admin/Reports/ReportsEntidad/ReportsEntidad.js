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
  const [filterProfesor, setfilterProfesor] = useState('')
  console.log(dataReport)
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

  const saber_tanda = (arrayData, tanda) => {
    if (tanda === TANDA_ENUMS.MATUTINA) {
      return arrayData.find((item) => item.tanda === tanda)
    }
    if (tanda === TANDA_ENUMS.VERPERTINA) {
      return arrayData.find((item) => item.tanda === tanda)
    }
  }

  return (
    <>
    <Table color='green'>
      <Table.Header>
        <Table.Row>
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
            <Table.HeaderCell>Tanda Matutina</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>Tanda Vespertina</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>Hora entrada</Table.HeaderCell>
            <Table.HeaderCell>Hora salida</Table.HeaderCell>
            <Table.HeaderCell>Hora entrada</Table.HeaderCell>
            <Table.HeaderCell>Hora salida</Table.HeaderCell>
          </Table.Row>
      </Table.Header>

      <Table.Body>
        {
          size(dataReport) >0 ?
          map(dataReport,(data, index) =>

          data.id_user?.name.includes(filterProfesor) ?
          (
            <Table.Row key={index} positive={imprimir_color_profesor(data.id_user?.name)}>
              <Table.Cell width={2}>{imprimir_name_profesor(data.id_user?.name)}</Table.Cell>
              <Table.Cell>{moment(data.date).utc().format('YYYY-MM-DD')}</Table.Cell>
                  <Table.Cell
                    negative={(saber_tanda(data.tandas, TANDA_ENUMS.MATUTINA))?.hora_entrada
                      ? moment((saber_tanda(data.tandas, TANDA_ENUMS.MATUTINA))?.hora_entrada).hour() >= 8 ? true : false
                      : false
                    }>
                    {saber_tanda(data.tandas, TANDA_ENUMS.MATUTINA)
                      ? moment((saber_tanda(data.tandas, TANDA_ENUMS.MATUTINA))?.hora_entrada).format('LT')
                      : ""
                    }</Table.Cell>
                  <Table.Cell
                  negative={(saber_tanda(data.tandas, TANDA_ENUMS.MATUTINA))?.hora_salida
                    ? 12 <= moment((saber_tanda(data.tandas, TANDA_ENUMS.MATUTINA))?.hora_salida).hour() ? false : true
                    : false
                  }>
                  {saber_tanda(data.tandas, TANDA_ENUMS.MATUTINA)
                    ? moment((saber_tanda(data.tandas, TANDA_ENUMS.MATUTINA))?.hora_salida).format('LT')
                    : ""
                  }</Table.Cell>
                  <Table.Cell
                    negative={(saber_tanda(data.tandas, TANDA_ENUMS.VERPERTINA))?.hora_entrada
                      ? moment((saber_tanda(data.tandas, TANDA_ENUMS.VERPERTINA))?.hora_entrada).hour() >= 14 ? true : false
                      : false
                    }>
                    {saber_tanda(data.tandas, TANDA_ENUMS.VERPERTINA)
                    ? moment((saber_tanda(data.tandas, TANDA_ENUMS.VERPERTINA))?.hora_entrada).format('LT')
                    : ""
                  }</Table.Cell>
                  <Table.Cell
                    negative={(saber_tanda(data.tandas, TANDA_ENUMS.VERPERTINA))?.hora_salida
                    ? 17 <= moment((saber_tanda(data.tandas, TANDA_ENUMS.VERPERTINA))?.hora_salida).hour() ? false : true
                    : false
                  }>
                    {saber_tanda(data.tandas, TANDA_ENUMS.VERPERTINA)
                    ? moment((saber_tanda(data.tandas, TANDA_ENUMS.VERPERTINA))?.hora_salida).format('LT')
                    : ""
                  }</Table.Cell>
            </Table.Row>

          ): null) :
          <Table.Row>
            <Table.Cell>No hay data aun</Table.Cell>
          </Table.Row>
        }
      </Table.Body>
    </Table>
    </>
  )
}
