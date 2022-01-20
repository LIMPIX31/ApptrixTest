import React from 'react'
import { useAuthRedirect } from '../../hooks/useAuthRedirect'

import s from './Home.module.scss'
import { Issues } from '../../components/containers/Issues/Issues'
import { Users } from '../../components/containers/Users/Users'

export const Home: React.FC = () => {
  useAuthRedirect()
  return <div className={s.homePage}>
    <div className={s.content}>
      <Users />
    </div>
    <Issues />
  </div>
}
