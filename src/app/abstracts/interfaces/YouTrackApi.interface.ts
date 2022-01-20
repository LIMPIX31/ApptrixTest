import { YouTrackIssue, YouTrackUser, YouTrackWorkItem } from '../types/YouTrackApi.types'

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

  /**
   * Обновить список временных записей
   */
  fetchWorkItems(): void

  /**
   * Получить временные записи по id задачи
   * @param issue
   */
  getWorkitemsFromIssue(issueid: string): YouTrackWorkItem[]
}
