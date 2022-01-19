import { Container } from 'inversify'
import { ApptrixApi as IApptrixApi } from '../abstracts/interfaces/ApptrixApi.interface'
import { TYPES } from './types'
import { ApptrixApi } from '../api/ApptrixApi.class'

export const AppContainer = new Container({
  defaultScope: 'Singleton',
  skipBaseClassChecks: true,
})

AppContainer.bind<IApptrixApi>(TYPES.ApptrixApi).to(ApptrixApi)
