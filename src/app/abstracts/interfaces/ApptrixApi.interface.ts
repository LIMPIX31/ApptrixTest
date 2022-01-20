import { APIRequestException } from '../../exceptions/APIRequest.exception'

export interface ApptrixApi {
  /**
   * Возвращает true если пользователь вошёл в аккаунт
   */
  get isLogged(): boolean

  /**
   * Войти в аккунт
   * @param username
   * @param password
   */
  login(username: string, password: string): Promise<void>

  /**
   * Получить ошибку запроса (если возникла)
   */
  get error(): APIRequestException | undefined

  /**
   * Отправить запрос на обновление токенов и в случае успеха авторизовать пользователя
   */
  check(): boolean | Promise<boolean>

  /**
   * Выйти из аккаунта
   */
  logout(): void
}
