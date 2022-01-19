import React from 'react'
import s from './Login.module.scss'
import { InclinedInput } from '../../components/UIElements/InclinedInput/InclinedInput'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { InclinedButton } from '../../components/UIElements/InclinedButton/InclinedButton'
import { AppContainer } from '../../app/IoC/container'
import { ApptrixApi } from '../../app/abstracts/interfaces/ApptrixApi.interface'
import { TYPES } from '../../app/IoC/types'
import { useNavigate } from 'react-router-dom'

const requiredText = 'Это поле обязательно'

const LoginVLSH = Yup.object().shape({
  username: Yup.string().required(requiredText),
  password: Yup.string().required(requiredText),
})
export const Login: React.FC = () => {

  return <div className={s.loginPage}>
    <div className={s.formWrapper}>
      <div className={s.title}>Login</div>
      <Form />
    </div>
  </div>
}

export const Form: React.FC = () => {

  const api = AppContainer.get<ApptrixApi>(TYPES.ApptrixApi)
  const nav = useNavigate()

  return <Formik
    initialValues={{
      username: '',
      password: '',
    }}
    validationSchema={LoginVLSH}
    onSubmit={(values, { setSubmitting }) => {
      setSubmitting(true)
      api.login(values.username, values.password).then(() => {
        nav('/', { replace: true })
        setSubmitting(false)
      }).catch(() => {
        setSubmitting(false)
        console.log(api.error?.data)
      })
    }}>
    {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        submitForm,
      }) => (

      <form onSubmit={handleSubmit} className={s.form}>
        {api.error && <div className={s.error}>
          <div className={s.status}>
            {api.error.status}
          </div>
          <div className={s.message}>
            {api.error.data.detail || api.error.reqMessage}
          </div>
        </div>}
        <InclinedInput name={'username'} className={s.formInput} type={'login'} value={values.username}
                       placeholder={'Логин'}
                       errors={errors} touched={touched} disabled={isSubmitting} onChange={handleChange}
                       onBlur={handleBlur} />
        <InclinedInput name={'password'} className={s.formInput} type={'password'} value={values.password}
                       placeholder={'Пароль'}
                       errors={errors} touched={touched} disabled={isSubmitting} onChange={handleChange}
                       onBlur={handleBlur} />
        <InclinedButton className={s.submit} label={'Login'} disabled={isSubmitting} onClick={submitForm} />
      </form>

    )}
  </Formik>
}
