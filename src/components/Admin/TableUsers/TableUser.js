import React,{useState} from 'react'
import {Table, Button, Icon, TableRow, Search} from 'semantic-ui-react'
import {map} from 'lodash'

import './TableUsers.scss'

export  function TableUser(props) {

    const { users, updateUser, onDeleteUser } = props
    const [cedula, setcedula] = useState('')
    const [filterName, setfilterName] = useState('')
    const [filterDepartamento, setfilterDepartamento] = useState('')

    const cambiar_input_search_cedula = (value) => {
        setcedula(value.target.value)
    }

    const cambiar_input_search_name = (value) => {
        setfilterName(value.target.value)
    }

    const cambiar_input_search_Tanda = (value) => {
        setfilterDepartamento(value.target.value)
    }


    return (
        <>
        <Table color='green'>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell textAlign='left' width={1}>
            <Search value={filterName} showNoResults={false} onSearchChange={cambiar_input_search_name}  placeholder="Filtrar por Nombre" />
          </Table.HeaderCell>
          <Table.HeaderCell textAlign='left' width={1}>
            <Search value={cedula} showNoResults={false} onSearchChange={cambiar_input_search_cedula}  placeholder="Filtrar por Cedula" />
        </Table.HeaderCell>
            <Table.HeaderCell textAlign='left'>
            <Search value={filterDepartamento} showNoResults={false} onSearchChange={cambiar_input_search_Tanda}  placeholder="Filtrar por Tanda" />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    </Table>

    <Table className='table-users-admin' color='teal' id='Report'>
        <Table.Header>
            <TableRow>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>cedula</Table.HeaderCell>
                <Table.HeaderCell>id_anterior</Table.HeaderCell>
                <Table.HeaderCell>Departamento</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
            </TableRow>
        </Table.Header>

        <Table.Body>
            {
                map(users, (user, index) => (
                    user.name.includes(filterName) ?
                    user.cedula.includes(cedula) ?
                    user.departamento.includes(filterDepartamento) ?
                    <Table.Row key={index}>
                        <Table.Cell>{user.name}</Table.Cell>
                        <Table.Cell>{user.cedula}</Table.Cell>
                        <Table.Cell>{user.id_anterior}</Table.Cell>
                        <Table.Cell>{user.departamento}</Table.Cell>
                        <Actions user={user} updateUser={updateUser} onDeleteUser={onDeleteUser}/>

                    </Table.Row>
                    :null:null:null
                ))
            }
        </Table.Body>
            </Table>
    </>
  )
}


const Actions = (props) => {

    const {user, updateUser, onDeleteUser} = props;


    return (
        <Table.Cell textAlign='right'>
            <Button icon onClick={()=>updateUser(user)}>
                <Icon name='pencil'/>
            </Button>
            <Button icon negative onClick={() => onDeleteUser(user)}>
                <Icon name='close'></Icon>
            </Button>
        </Table.Cell>
    )
}