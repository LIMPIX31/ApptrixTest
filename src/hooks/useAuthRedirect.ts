import { useStore } from '../app/IoC/container'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const useAuthRedirect = () => {
  const { ApptrixApi } = useStore()
  const nav = useNavigate()
  useEffect(() => {
    (async () => {
      if (!ApptrixApi.isLogged) {
        const check = await ApptrixApi.check()
        if (!check) {
          nav('/login', { replace: true })
        }
      }
    })()
  }, [ApptrixApi.isLogged])
}
