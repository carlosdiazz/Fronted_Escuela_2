import React,{useState} from 'react'
import {Table, Image, Button, Icon, Search} from 'semantic-ui-react'
import {map, filter} from 'lodash'
import './TableProductAdmin.scss'

export  function TableProductAdmin(props) {

  const {products, updateProduct, deleteProduct} = props;

  const [searchProduct, setSearchProduct] = useState('')

  const [searchCategory, setSearchCategory] = useState('')

  const cambiar_input_Product = (value) => {
    setSearchProduct(value.target.value)
  }

  const cambiar_input_Category = (value) => {
    setSearchCategory(value.target.value)
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
            <Search value={searchCategory} width={1} textAlign='left' showNoResults={false} onSearchChange={cambiar_input_Category}  placeholder="Filtrar por categorias" />
          </Table.HeaderCell>

        </Table.Row>
      </Table.Header>
    </Table>

    <Table className='table-product-admin' color='teal'>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Imagen</Table.HeaderCell>
          <Table.HeaderCell>Producto</Table.HeaderCell>
          <Table.HeaderCell>Descripcion</Table.HeaderCell>
          <Table.HeaderCell>Precio</Table.HeaderCell>
          <Table.HeaderCell>Categoria</Table.HeaderCell>
          <Table.HeaderCell>Stock</Table.HeaderCell>
          <Table.HeaderCell>Activo</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {map(products, (product, index )  =>

          product.name.includes(searchProduct) ?

          product.id_category?.name.includes(searchCategory) ?
        (
          <Table.Row key={index}>
            <Table.Cell width={2}>
              <Image src={product.img_url} />
            </Table.Cell>
            <Table.Cell>{product.name}</Table.Cell>
            <Table.Cell>{product.description}</Table.Cell>
            <Table.Cell>{product.price} $RD</Table.Cell>
            <Table.Cell>{product.id_category?.name || 'Null'}</Table.Cell>
            <Table.Cell>{product.stock}</Table.Cell>
            <Table.Cell className='status'>
                {product.is_active ? <Icon name='check'/> : <Icon name="close" />}
            </Table.Cell>
            <Actions product={product} updateProduct={updateProduct} deleteProduct={deleteProduct}/>
          </Table.Row>
        ):null :null)}


      </Table.Body>
    </Table>
    </>
  );
}

const Actions = (props) => {

  const {product, updateProduct, deleteProduct} = props;

  return (
    <Table.Cell textAlign='right'>
      <Button icon onClick={() => updateProduct(product)}>
        <Icon name='pencil' />
      </Button>

      <Button icon negative onClick={() => deleteProduct(product)}>
        <Icon name='close' />
      </Button>
    
    </Table.Cell>
  )


}