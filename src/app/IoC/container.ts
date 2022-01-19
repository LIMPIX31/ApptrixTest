import { Container } from 'inversify'
import { ApptrixApi as IApptrixApi } from '../abstracts/interfaces/ApptrixApi.interface'
import { YouTrackApi as IYouTrackApi } from '../abstracts/interfaces/YouTrackApi.interface'
import { TYPES } from './types'
import { ApptrixApi } from '../api/ApptrixApi.class'
import { YouTrackApi } from '../api/YouTrackApi.class'

export const AppContainer = new Container({
  defaultScope: 'Singleton',
  skipBaseClassChecks: true,
})

AppContainer.bind<IApptrixApi>(TYPES.ApptrixApi).to(ApptrixApi)
AppContainer.bind<IYouTrackApi>(TYPES.YouTrackApi).to(YouTrackApi)