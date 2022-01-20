import { InclinedInput } from '../../UIElements/InclinedInput/InclinedInput'
import React, { useEffect, useState } from 'react'

import s from './Issues.module.scss'
import { AppContainer } from '../../../app/IoC/container'
import { ApptrixApi } from '../../../app/abstracts/interfaces/ApptrixApi.interface'
import { TYPES } from '../../../app/IoC/types'
import { YouTrackApi } from '../../../app/abstracts/interfaces/YouTrackApi.interface'
import cn from 'classnames'
import { observer } from 'mobx-react'
import { InclinedButton } from '../../UIElements/InclinedButton/InclinedButton'

export const Issues = () => {

  const apptrixApi = AppContainer.get<ApptrixApi>(TYPES.ApptrixApi)
  const ytrApi = AppContainer.get<YouTrackApi>(TYPES.YouTrackApi)

  useEffect(() => {
    if (apptrixApi.isLogged) {
      ytrApi.fetchIssues()
    }
  }, [apptrixApi, ytrApi])

  const [filter, setFilter] = useState('')

  return <div className={s.issues}>
    <div className={s.filter}>
      <InclinedInput name={'filter'} enableAutocomplete value={filter} onChange={setFilter}
                     placeholder={filter.length > 1 ? ytrApi.findIssuesByProject(filter)[0]?.project?.name : ''} />
      <div className={s.issuesTable}>
        <div className={s.usersTable}>
          <div className={cn(s.row, s.header)}>
            <div className={s.item}>ID</div>
            <div className={s.item}>Project</div>
            <div className={s.item}>Description</div>
            <div className={s.item}>Timesheet</div>
          </div>
          <IssuesTable ytrApi={ytrApi} filter={filter}/>
        </div>
      </div>
    </div>
  </div>
}

export const IssuesTable = observer(({ ytrApi, filter }: { ytrApi: YouTrackApi, filter: string }) => {
  return <>
    {ytrApi.findIssuesByProject(filter).map(issue => (
      <div className={s.row}>
        <div className={s.item}>{issue.id}</div>
        <div className={s.item}>{issue.project.name}</div>
        <div className={s.item}>{issue.summary}</div>
        <div className={s.item}>
          <InclinedButton label={'Timesheet'}/>
        </div>
      </div>
    ))}
  </>
})
