import s from './Users.module.scss'
import cn from 'classnames'
import React, { useEffect, useState } from 'react'
import { AppContainer } from '../../../app/IoC/container'
import { ApptrixApi } from '../../../app/abstracts/interfaces/ApptrixApi.interface'
import { TYPES } from '../../../app/IoC/types'
import { YouTrackApi } from '../../../app/abstracts/interfaces/YouTrackApi.interface'
import { YouTrackUser } from '../../../app/abstracts/types/YouTrackApi.types'
import { observer } from 'mobx-react'

export const Users = () => {

  const apptrixApi = AppContainer.get<ApptrixApi>(TYPES.ApptrixApi)
  const ytrApi = AppContainer.get<YouTrackApi>(TYPES.YouTrackApi)

  const [selectedUser, setSelectedUser] = useState<YouTrackUser>()

  useEffect(() => {
    if (apptrixApi.isLogged) {
      ytrApi.fetchUsers()
    }
  }, [apptrixApi, ytrApi])

  return <>
    <div className={s.usersTable}>
      <div className={cn(s.row, s.header)}>
        <div>ID</div>
        <div>Name</div>
        <div>Login</div>
        <div>Email</div>
      </div>
      <UsersTable ytrApi={ytrApi} setUser={setSelectedUser} selected={selectedUser} />
    </div>
    <div className={s.userCard}>
      <PV name={'ID'} value={selectedUser?.id} />
      <PV name={'Name'} value={selectedUser?.name} />
      <PV name={'Login'} value={selectedUser?.login} />
      <PV name={'Email'} value={selectedUser?.email} />
      <PV name={'Type'} value={selectedUser?.$type} />
    </div>
  </>
}

const UsersTable = observer(({
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
