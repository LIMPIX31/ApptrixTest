export type YouTrackUser = {
  email: string,
  name: string,
  login: string,
  id: string
  $type: string
}

export type YouTrackIssue = {
  project: {
    name: string,
    $type: string
  },
  summary: string
  id: string,
  $type: string
}

export type YouTrackWorkItem = {
  issue:{
    id: string
  },
  duration:{
    minutes: number
  },
  author: {
    fullName: string
  }
}
