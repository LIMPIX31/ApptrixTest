import { YouTrackApi as IYouTrackApi } from '../abstracts/interfaces/YouTrackApi.interface'
import { action, computed, makeObservable, observable } from 'mobx'
import { injectable } from 'inversify'
import { RESTAPI } from './RESTAPI.class'
import { YouTrackUser } from '../abstracts/types/YouTrackApi.types'
import { YouTrackApiException } from '../exceptions/YouTrackApi.exception'
import { APIRequestException } from '../exceptions/APIRequest.exception'
import { AxiosError } from 'axios'

@injectable()
export class YouTrackApi extends RESTAPI implements IYouTrackApi {

  constructor() {
    super('https://demo-apptrix.myjetbrains.com/youtrack/api/')
    this.token = 'perm:cm9vdA==.NDktNQ==.U9qYToWJGGM0yfVz5wjeYYas7FDvGL'
    makeObservable(this)
  }

  @observable private _users: YouTrackUser[] = []

  @computed
  get users() {
    return this._users
  }

  @action
  async fetchUsers() {
    try {
      const res = await this.instance.get('admin/users?fields=id,login,name,email,$type')
      if (res.data) {
        this._users = res.data as YouTrackUser[]
      }
    } catch (e) {
      throw new YouTrackApiException(new APIRequestException(e as AxiosError))
    }
  }

}
