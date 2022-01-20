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
   * Удалить refresh токен из хранилища
   */
  clearRefreshToken(): void

  /**
   * Установить токен в хранилище
   * @param token
   */
  set token(token: string)

  /**
   * Получить экземпляр axios
   */
  get instance(): AxiosInstance

  /**
   * Установить refresh токен
   * @param refreshToken
   */
  set refreshToken(refreshToken: string)

  /**
   * Работает ли JWT авторизация в режиме, в котором refreshToken Находится в cookie, как впринципе и должно быть, но в Apptrix это почему-то не так
   */
  get cookieMode(): boolean

}
