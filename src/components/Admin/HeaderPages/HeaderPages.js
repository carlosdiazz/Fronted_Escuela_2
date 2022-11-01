import React from 'react'
import { Button } from 'semantic-ui-react'
import './HeaderPages.scss'

export function HeaderPages(props) {

  const {title, btnTitle, btnClick, btnTitleTwo, btnClickTwo} = props
    return (
    <div className='header-page-admin'>
        <h2>{title}</h2>

        <div>
            {btnTitle && (
                <Button positive onClick={btnClick} >
                    {btnTitle}
                </Button>
            )}

            {btnTitleTwo && (
                <Button primary onClick={btnClickTwo} >
                    {btnTitleTwo}
                </Button>
            )}

        </div>

    </div>
  )
}
