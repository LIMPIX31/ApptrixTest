import { RESTAPI } from './RESTAPI.class'
import { ApptrixApi as IApptrixApi } from '../abstracts/interfaces/ApptrixApi.interface'
import { LoginResponse } from '../abstracts/types/ApptrixApi.types'
import { APIRequestException } from '../exceptions/APIRequest.exception'
import { AxiosError } from 'axios'
import { injectable } from 'inversify'
import { action, computed, makeObservable, observable } from 'mobx'
import 'reflect-metadata'

@injectable()
export class ApptrixApi extends RESTAPI implements IApptrixApi {

  @observable private _logged: boolean = false

  constructor() {
    super('http://erp.apptrix.ru/api/', 'token/refresh/')
    makeObservable(this)
  }

  @observable private _error: APIRequestException | undefined

  @computed
  get error() {
    return this._error
  }

  @computed
  get isLogged() {
    return this._logged
  }

  @action
  async login(username: string, password: string) {
    try {
      const res = await this.instance.post<LoginResponse>('token/', { username, password })
      if (res.data && res.data.access) {
        this._logged = true
        this.token = res.data.access
      }
    } catch (e) {
      this._error = new APIRequestException(e as AxiosError)
      throw this._error
    }
  }

  @action
  async check() {
    if (await this.refresh()) this._logged = true
  }

}
