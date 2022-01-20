import React from 'react'
import { useAuthRedirect } from '../../hooks/useAuthRedirect'

import s from './Home.module.scss'
import { Issues } from '../../components/containers/Issues/Issues'
import { Users } from '../../components/containers/Users/Users'
import { InclinedButton } from '../../components/UIElements/InclinedButton/InclinedButton'
import { observer } from 'mobx-react'
import { useStore } from '../../app/IoC/container'

export const Home = observer(() => {

  const { ApptrixApi } = useStore()

  useAuthRedirect()
  return <div className={s.homePage}>
    <InclinedButton className={s.logout} label={'Выйти из акканута'} onClick={() => ApptrixApi.logout()}/>
    <div className={s.content}>
      <Users />
    </div>
    <Issues />
  </div>
})
