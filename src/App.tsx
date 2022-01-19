import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { Login } from './pages/Login/Login'
import { AppContainer } from './app/IoC/container'
import { ApptrixApi } from './app/abstracts/interfaces/ApptrixApi.interface'
import { TYPES } from './app/IoC/types'

export const App: React.FC = () => {

  useEffect(() => {
    const apptrixApi = AppContainer.get<ApptrixApi>(TYPES.ApptrixApi)
    apptrixApi.check()
  }, [])

  return <Routes>
    <Route path={'/'} element={<Home />} />
    <Route path={'/login'} element={<Login />} />
  </Routes>
}
