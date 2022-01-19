import { AxiosError } from 'axios'

export class APIRequestException extends Error {

  private readonly _data: any
  private readonly _status: any

  constructor(error: AxiosError, private _isRefreshError: boolean = false) {
    super(`API request exception:\n${error.message}`)
    this._data = error.response?.data
    this._status = error.response?.status
  }

  get data() {
    return this._data
  }

  get status() {
    return this._status
  }

  get reqMessage() {
    switch (this.status) {
      case 401:
        return 'Пользователь не авторизован'
      case 500:
        return 'Ошибка сервера'
      case 404:
        return 'Не найдено'
      case 400:
        return 'Некорректный запрос'
      default:
        return 'Неизвестная ошибка'
    }
  }

  get isRefreshError() {
    return this._isRefreshError
  }

}
