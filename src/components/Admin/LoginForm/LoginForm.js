import React from 'react'
import './LoginForm.scss'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {toast} from 'react-toastify'
import {Button, Form} from "semantic-ui-react"
import {loginApi} from '../../../api/user'
import {useAuth} from '../../../hooks'

export function LoginForm() {
  const {login} = useAuth()
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    onSubmit: async (formValue) => {
      try{
        const response = await loginApi(formValue)
        const access = response.token
        login(access)
        toast.success('Logueado correctamente')

      }catch(error){
        toast.error(error.message)
      }
    }

  })


  return (
    <Form className='login-form-admin' onSubmit={formik.handleSubmit}>
        <Form.Input
          name='nickname'
          type='user'
          placeholder='Usuario'
          value={formik.values.nickname}
          onChange={formik.handleChange}
          error={formik.errors.nickname}
        />

        <Form.Input
          name='password'
          type='password'
          placeholder='Contraseña'
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password}
        />
        <Button
        type='submit'
        className='btn-submit primary fluid'
        >Iniciar</Button>
    </Form>
  )
}

const initialValues = () => {
  return {
    nickname: '',
    password: ''
  }
}

const validationSchema = () => {
  return Yup.object({
    nickname: Yup.string().required(true),
    password: Yup.string().required(true)
  })
}