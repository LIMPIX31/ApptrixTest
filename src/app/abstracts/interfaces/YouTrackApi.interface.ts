import { YouTrackIssue, YouTrackUser } from '../types/YouTrackApi.types'

export interface YouTrackApi {
  /**
   * Возвращает список ранее загруженных пользователей
   */
  get users(): YouTrackUser[]

  /**
   * Обновить список пользователей
   */
  fetchUsers(): void

  /**
   * Получить список задач
   */
  get issues(): YouTrackIssue[]

  /**
   * Обновить список задач
   */
  fetchIssues(): void

  /**
   * Найти задачи по названию проекта (нужно для автокомплита)
   * @param partialProjectName
   */
  findIssuesByProject(partialProjectName: string): YouTrackIssue[]
}
