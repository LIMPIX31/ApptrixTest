import { AxiosInstance } from 'axios'

export interface RESTAPI {
  /**
   * Получить имя ключа токена для запросов к API
   */
  get accessTokenKey(): string

  /**
   * Попытаться обновить токен. В случае успеха вернёт true
   */
  refresh(): boolean | Promise<boolean>

  /**
   * Удалить токен из хранилища
   */
  clearToken(): void

  /**
   * Установить токен в хранилище
   * @param token
   */
  set token(token: string)

  /**
   * Получить экземпляр axios
   */
  get instance(): AxiosInstance

}
