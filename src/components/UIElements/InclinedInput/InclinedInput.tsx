import React from 'react'
import s from './InclinedInput.module.scss'
import cn from 'classnames'
import { Field, FormikErrors, FormikTouched } from 'formik'

export const InclinedInput: React.FC<{
  name: string
  className?: string
  type?: 'login' | 'email' | 'password' | 'text',
  disabled?: boolean,
  placeholder?: string,
  value?: string,
  onChange?: React.ChangeEventHandler
  onBlur?: React.FocusEventHandler,
  touched?: FormikTouched<any>,
  errors?: FormikErrors<any>,

}> = ({
        className,
        type = 'text',
        disabled = false,
        placeholder = '',
        value = '',
        onChange,
        errors = {},
        onBlur,
        touched = {},
        name,
      }) => {
  return <>
    <div className={cn(s.wrapper, disabled && s.disabled, (touched[name] && errors[name]) && s.error, className)}>
      <div className={s.filler} />
      <Field className={s.input} name={name} type={type} disabled={disabled} placeholder={placeholder} value={value}
             onChange={onChange} onBlur={onBlur} />
      <div className={cn(s.errMessage, !(touched[name] && errors[name]) && s.hideErr)}>
        {errors[name]}
      </div>
    </div>
  </>
}
