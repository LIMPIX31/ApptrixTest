import { RESTAPI as IRESTAPI } from '../abstracts/interfaces/RESTAPI.interface'
import axios, { AxiosError, AxiosInstance } from 'axios'
import 'reflect-metadata'
import { APIRequestException } from '../exceptions/APIRequest.exception'

/**
 * JWT авторизация работает не так как ожидалось.
 * Ожидалось, что refresh token будет хранится в cookie, а не в localStorage
 * TODO: Изменить способ хранения refresh токена
 */
export class RESTAPI implements IRESTAPI {

  private readonly axios: AxiosInstance
  private readonly baseURL: string
  private readonly refreshEndpoint: string

  constructor(baseURL: string, refreshEndpoint: string = '', private _cookieMode: boolean = true, private refreshKey: string = 'refresh') {
    this.baseURL = baseURL
    this.refreshEndpoint = refreshEndpoint
    this.axios = axios.create({
      withCredentials: true,
      baseURL,
    })
    this.axios.interceptors.request.use(config => {
      if (config.headers) {
        const acct = localStorage.getItem(this.accessTokenKey)
        acct && (config.headers.Authorization = `Bearer ${acct}`)
      }
      return config
    })

    this.axios.interceptors.response.use(
      config => {
        return config
      },
      async error => {
        const originalRequest = error.config
        if (error.response) {
          if (
            error.response.status === 401 &&
            originalRequest &&
            !originalRequest._isRetry
          ) {
            try {
              originalRequest._isRetry = true
              try {
                await this.refresh()
              } catch (e) {
              }
              return this.axios.request(originalRequest)
            } catch (e) {
              throw new APIRequestException(e as AxiosError, true)
            }
          } else {
            throw error
          }
        } else {
          throw error
        }
      },
    )
  }

  set token(token: string) {
    localStorage.setItem(this.accessTokenKey, token)
  }

  set refreshToken(refreshToken: string) {
    localStorage.setItem(this.refreshTokenKey, refreshToken)
  }

  get accessTokenKey(): string {
    return `accessToken[${btoa(this.baseURL)}]`
  }

  get refreshTokenKey(): string {
    return `refreshToken[${btoa(this.baseURL)}]`
  }

  get instance() {
    return this.axios
  }

  get cookieMode() {
    return this._cookieMode
  }

  async refresh() {
    try {
      console.log(localStorage.getItem(this.refreshTokenKey))
      const data = !this._cookieMode ? await axios
          .post(
            `${this.baseURL}${this.refreshEndpoint}`,
            {
              [this.refreshKey]: localStorage.getItem(this.refreshTokenKey),
            },
            {
              withCredentials: true,
              timeout: 5000,
            },
          ) :
        await this.axios
          .get(
            `${this.baseURL}${this.refreshEndpoint}`,
            {
              withCredentials: true,
              timeout: 5000,
            },
          )
      if (data) {
        localStorage.setItem(this.accessTokenKey, data.data.access)
        if (!this._cookieMode && data.data.refresh) localStorage.setItem(this.refreshTokenKey, data.data.refresh)
        return true
      } else {
        return false
      }
    } catch (e) {
      console.log((e as AxiosError)?.response?.data)
      return false
    }
  }

  clearToken() {
    localStorage.removeItem(this.accessTokenKey)
  }

  clearRefreshToken(): void {
    localStorage.removeItem(this.refreshTokenKey)
  }

}
