import { InclinedInput } from '../../UIElements/InclinedInput/InclinedInput'
import React, { useEffect, useState } from 'react'

import s from './Issues.module.scss'
import { useStore } from '../../../app/IoC/container'
import { YouTrackApi } from '../../../app/abstracts/interfaces/YouTrackApi.interface'
import cn from 'classnames'
import { observer } from 'mobx-react'
import { InclinedButton } from '../../UIElements/InclinedButton/InclinedButton'
import { useNavigate } from 'react-router-dom'

export const Issues = observer(() => {
  const { ApptrixApi, YouTrackApi } = useStore()

  const apptrixApi = ApptrixApi
  const ytrApi = YouTrackApi

  useEffect(() => {
    if (apptrixApi.isLogged) {
      ytrApi.fetchIssues()
      ytrApi.fetchWorkItems()
    }
  }, [apptrixApi.isLogged])

  const [filter, setFilter] = useState('')

  return <div className={s.issues}>
    <div className={s.filter}>
      <InclinedInput name={'filter'} enableAutocomplete value={filter} onChange={setFilter}
                     placeholder={filter.length > 0 ? ytrApi.findIssuesByProject(filter)[0]?.project?.name : 'Фильтр по проекту'} />
      <div className={s.issuesTable}>
        <div className={cn(s.row, s.header)}>
          <div className={s.item}>ID</div>
          <div className={s.item}>Project</div>
          <div className={s.item}>Description</div>
          <div className={s.item}>Timesheet</div>
        </div>
        <IssuesTable ytrApi={ytrApi} filter={filter} />
      </div>
    </div>
  </div>
})

export const IssuesTable = observer(({ ytrApi, filter }: { ytrApi: YouTrackApi, filter: string }) => {

  const nav = useNavigate()

  const tshAvailable = (id: string) => ytrApi.getWorkitemsFromIssue(id).length !== 0

  return <>
    {ytrApi.findIssuesByProject(filter).map(issue => (
      <div className={s.row}>
        <div className={s.item}>{issue.id}</div>
        <div className={s.item}>{issue.project.name}</div>
        <div className={s.item}>{issue.summary}</div>
        <div className={s.item}>
          <InclinedButton label={tshAvailable(issue.id) ? 'Timesheet' : 'Not available'} disabled={!tshAvailable(issue.id)}
                          onClick={() => nav(`/timesheet/${issue.id}`, { replace: true })} />
        </div>
      </div>
    ))}
  </>
})
