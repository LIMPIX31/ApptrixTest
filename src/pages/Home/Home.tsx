import React from 'react'
import { useAuthRedirect } from '../../hooks/useAuthRedirect'

export const Home: React.FC = () => {
  useAuthRedirect()
  return <div>

  </div>
}
