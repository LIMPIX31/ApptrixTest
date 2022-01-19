import { APIRequestException } from './APIRequest.exception'

export class YouTrackApiException extends Error {
  constructor(err: APIRequestException) {
    super(`YouTrack API Exception: Status: ${err.status}. Message: ${err.reqMessage}.\nError: ${err.message}`)
  }
}
