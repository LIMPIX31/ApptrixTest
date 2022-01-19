import React, { useEffect, useState } from 'react'
import { useAuthRedirect } from '../../hooks/useAuthRedirect'
import { AppContainer } from '../../app/IoC/container'
import { YouTrackApi } from '../../app/abstracts/interfaces/YouTrackApi.interface'
import { TYPES } from '../../app/IoC/types'
import { ApptrixApi } from '../../app/abstracts/interfaces/ApptrixApi.interface'

import s from './Home.module.scss'
import { YouTrackUser } from '../../app/abstracts/types/YouTrackApi.types'
import { observer } from 'mobx-react'
import cn from 'classnames'

export const Home: React.FC = () => {
  useAuthRedirect()

  const apptrixApi = AppContainer.get<ApptrixApi>(TYPES.ApptrixApi)
  const ytrApi = AppContainer.get<YouTrackApi>(TYPES.YouTrackApi)

  const [selectedUser, setSelectedUser] = useState<YouTrackUser>()

  useEffect(() => {
    if (apptrixApi.isLogged) {
      ytrApi.fetchUsers()
    }
  }, [apptrixApi, ytrApi])

  return <div className={s.homePage}>
    <div className={s.content}>
      <div className={s.usersTable}>
        <div className={cn(s.row, s.header)}>
          <div>ID</div>
          <div>Name</div>
          <div>Login</div>
          <div>Email</div>
        </div>
        <Users ytrApi={ytrApi} setUser={setSelectedUser} selected={selectedUser}/>
      </div>
      <div className={s.userCard}>
        <PV name={'ID'} value={selectedUser?.id} />
        <PV name={'Name'} value={selectedUser?.name} />
        <PV name={'Login'} value={selectedUser?.login} />
        <PV name={'Email'} value={selectedUser?.email} />
        <PV name={'Type'} value={selectedUser?.$type} />
      </div>
    </div>
  </div>
}

export const PV: React.FC<{
  name: string,
  value?: string
}> = ({ name, value }) => {
  return <div className={s.pv}>
    <span className={s.pvname}>
      {name}:
    </span>
    <span className={s.pvvalue}>
      {value}
    </span>
  </div>
}

const Users = observer(({
                          ytrApi,
                          setUser,
                          selected,
                        }: { ytrApi: YouTrackApi, setUser: Function, selected?: YouTrackUser }) => {
  return <>
    {ytrApi.users.map(user => (
      <div className={cn(s.row, selected?.id === user.id && s.selected)} onClick={_ => {
        setUser(user)
      }}>
        <div>{user.id}</div>
        <div>{user.name}</div>
        <div>{user.login}</div>
        <div>{user.email}</div>
      </div>
    ))}
  </>
})
