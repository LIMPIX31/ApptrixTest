import { Container } from 'inversify'
import { ApptrixApi as IApptrixApi } from '../abstracts/interfaces/ApptrixApi.interface'
import { YouTrackApi as IYouTrackApi } from '../abstracts/interfaces/YouTrackApi.interface'
import { TYPES } from './types'
import { ApptrixApi } from '../api/ApptrixApi.class'
import { YouTrackApi } from '../api/YouTrackApi.class'
import React from 'react'

export const AppContainer = new Container({
  defaultScope: 'Singleton',
  skipBaseClassChecks: true,
})

AppContainer.bind<IApptrixApi>(TYPES.ApptrixApi).to(ApptrixApi)
AppContainer.bind<IYouTrackApi>(TYPES.YouTrackApi).to(YouTrackApi)

export type StoreType = {
  ApptrixApi: IApptrixApi,
  YouTrackApi: IYouTrackApi
}

export const createStore = (): StoreType => {
  return {
    ApptrixApi: AppContainer.get<ApptrixApi>(TYPES.ApptrixApi),
    YouTrackApi: AppContainer.get<YouTrackApi>(TYPES.YouTrackApi),
  }
}

export const StoreContext = React.createContext<StoreType | null>(null)

export const useStore = () => {
  const store = React.useContext(StoreContext)
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.')
  }
  return store
}
