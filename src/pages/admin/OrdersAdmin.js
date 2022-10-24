import React,{useEffect} from 'react'
import {Loader} from 'semantic-ui-react'
import {HeaderPages, TablesListAdmin} from '../../components/Admin'
import {useTable} from '../../hooks'

export function OrdersAdmin() {

  const {loading, tables, getTables} = useTable()

  useEffect(() => {
    getTables()
  }, [])

  return (
    <>
      <HeaderPages title="Restaurante" />
      {
        loading
        ? (<Loader active inline='centered' />)
        : <TablesListAdmin tables={tables}/>
      }
    </>
  )
}
