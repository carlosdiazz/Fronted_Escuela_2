import React from 'react'
import {Table, Button, Icon, TableRow} from 'semantic-ui-react'
import {map} from 'lodash'

import './TableUsers.scss'

export  function TableUser(props) {

  const {users, updateUser, onDeleteUser} = props

    return (
    <Table className='table-users-admin' color='teal'>
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
                    <Table.Row key={index}>
                        <Table.Cell>{user.name}</Table.Cell>
                        <Table.Cell>{user.cedula}</Table.Cell>
                        <Table.Cell>{user.id_anterior}</Table.Cell>
                        <Table.Cell>{user.departamento}</Table.Cell>
                        <Actions user={user} updateUser={updateUser} onDeleteUser={onDeleteUser}/>

                    </Table.Row>
                ))
            }
        </Table.Body>
    </Table>
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