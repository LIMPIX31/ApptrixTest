import React, { useState } from 'react'
import s from './InclinedButton.module.scss'
import cn from 'classnames'

export const InclinedButton: React.FC<{
  label?: string
  className?: string
  onClick?: () => void
  disabled?: boolean
}> = ({
        className,
        label,
        onClick = () => {
        },
        disabled = false,
      }) => {
  const [clicked, setClicked] = useState(false)

  const clickMiddleware = () => {
    if (!disabled) {
      setClicked(true)
      setTimeout(_ => setClicked(false), 100)
      onClick()
    }
  }

  return (
    <div
      className={cn(className, s.inclineBox, clicked && s.clicked, disabled && s.disabled)}
      onClick={() => clickMiddleware()}
      tabIndex={0}
    >
      <div className={s.filler} />
      <div className={s.content}>{label}</div>
    </div>
  )
}
