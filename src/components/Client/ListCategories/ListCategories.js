import React from 'react'
import {Image} from 'semantic-ui-react'
import {map} from 'lodash'
import {useLocation, useNavigate} from 'react-router-dom'
import './ListCategories.scss'

export function ListCategories(props) {

  const {categories} = props

    const location = useLocation()
    const navigate = useNavigate()

  const goToCategoty = (id) => {
    navigate(`${location.pathname}/${id}`)
  }

    return (
    <div className='list-categories-client'>
        {
            map(categories, (category) => (
                <div key={category._id} className='list-categories-client__category' onClick={() => goToCategoty(category._id)}>
                    <Image src={category.imgUrl} size='small' />
                    <span>{category.name}</span>
                </div>
            ))
        }
    </div>
  )
}
