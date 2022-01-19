import { AppContainer } from '../app/IoC/container'
import { ApptrixApi } from '../app/abstracts/interfaces/ApptrixApi.interface'
import { TYPES } from '../app/IoC/types'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const useAuthRedirect = () => {
  const isLogged = AppContainer.get<ApptrixApi>(TYPES.ApptrixApi).isLogged
  const nav = useNavigate()
  useEffect(() => {
    if (!isLogged)
      nav('/login', { replace: true })
  }, [isLogged, nav])
}
