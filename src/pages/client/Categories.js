import React, {useEffect} from 'react'
import {useCategory} from '../../hooks'
import {Loader} from 'semantic-ui-react'
import {ListCategories} from '../../components/Client'

export function Categories() {

    const {loading, categories, getCategories} = useCategory()

    useEffect(() => {
        getCategories()
    }, [])

  return (
    <div>
        <h1>Categorias</h1>
        {
            loading
                ? (<Loader active inline='centered'>Cargando...</Loader>)
                : <ListCategories categories={categories}/>
        }
    </div>
  )
}
