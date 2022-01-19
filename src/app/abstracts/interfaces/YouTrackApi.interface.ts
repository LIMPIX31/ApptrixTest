import { YouTrackUser } from '../types/YouTrackApi.types'

export interface YouTrackApi {
  /**
   * Возвращает список ранее загруженных пользователей
   */
  get users(): YouTrackUser[]

  /**
   * Обновить список пользователей
   */
  fetchUsers(): void
}
