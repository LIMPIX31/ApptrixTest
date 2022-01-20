import React, { KeyboardEventHandler } from 'react'
import s from './InclinedInput.module.scss'
import cn from 'classnames'
import { Field, FormikErrors, FormikTouched } from 'formik'

export const InclinedInput: React.FC<{
  name: string
  className?: string
  formik?: boolean
  type?: 'login' | 'email' | 'password' | 'text',
  disabled?: boolean,
  placeholder?: string,
  value?: string,
  onChange?: React.ChangeEventHandler | Function
  onBlur?: React.FocusEventHandler,
  touched?: FormikTouched<any>,
  errors?: FormikErrors<any>,
  enableAutocomplete?: boolean

}> = ({
        className,
        type = 'text',
        formik = false,
        disabled = false,
        placeholder = '',
        value = '',
        onChange = () => {
        },
        errors = {},
        onBlur,
        touched = {},
        name,
        enableAutocomplete = false,
      }) => {

  const onComplete = (e: KeyboardEvent) => {
    if ((e.code === 'Enter' || e.code === 'Tab') && enableAutocomplete) {
      onChange(placeholder)
    }
  }

  return <>
    <div className={cn(s.wrapper, disabled && s.disabled, (touched[name] && errors[name]) && s.error, className)}>
      <div className={s.filler} />
      {formik ?
        <Field className={s.input} name={name} type={type} disabled={disabled} placeholder={placeholder} value={value}
               onChange={onChange} onBlur={onBlur} />
        :
        <>
          <input id={name} className={cn(s.input, enableAutocomplete && s.alwaysPlaceholder)} name={name} type={type}
                 disabled={disabled} placeholder={!enableAutocomplete ? placeholder : ''} value={value}
                 onChange={_ => onChange(_.target.value)} onBlur={onBlur} onKeyDown={e => onComplete(e as any)} />
          {enableAutocomplete && <div className={s.placeholder}>{placeholder}</div>}
        </>
      }
      <div className={cn(s.errMessage, !(touched[name] && errors[name]) && s.hideErr)}>
        {errors[name]}
      </div>
    </div>
  </>
}
