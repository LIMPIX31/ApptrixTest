import React, { useEffect } from 'react'
import s from './Timesheet.module.scss'
import { AppContainer } from '../../app/IoC/container'
import { TYPES } from '../../app/IoC/types'
import { useParams } from 'react-router-dom'
import { YouTrackApi } from '../../app/abstracts/interfaces/YouTrackApi.interface'
import { ApptrixApi } from '../../app/abstracts/interfaces/ApptrixApi.interface'
import { useAuthRedirect } from '../../hooks/useAuthRedirect'
import cn from 'classnames'
import { observer } from 'mobx-react'

export const Timesheet: React.FC = () => {

  const { issueid } = useParams()

  useAuthRedirect()

  const apptrixApi = AppContainer.get<ApptrixApi>(TYPES.ApptrixApi)
  const ytrApi = AppContainer.get<YouTrackApi>(TYPES.YouTrackApi)

  useEffect(() => {
    if (apptrixApi.isLogged) {
      ytrApi.fetchWorkItems()
    }
  }, [apptrixApi, ytrApi])

  return <div className={s.timeSheetPage}>
    <div className={s.timeSheetTable}>
      <div className={cn(s.row, s.header)}>
        <div className={s.item}>UserName</div>
        <div className={s.item}>Duration</div>
      </div>
      <WorkItems ytrApt={ytrApi} issueid={issueid || ''}/>
    </div>
  </div>
}


export const WorkItems = observer(({ ytrApt, issueid }: { ytrApt: YouTrackApi, issueid: string }) => {
  return <>
    {ytrApt.getWorkitemsFromIssue(issueid).map(wi => (
      <div className={s.row}>
        <div className={s.item}>{wi.author.fullName}</div>
        <div className={s.item}>{formatTime(wi.duration.minutes)}</div>
      </div>
    ))}
  </>
})

const formatTime = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  if(hours > 0 && minutes > 0){
    return `${hours} hours ${minutes} minutes`
  }else if(hours > 0 && minutes === 0){
    return `${hours} hours`
  }else if(minutes > 0 && hours === 0){
    return `${minutes} minutes`
  }
}
