import React, { useEffect } from 'react'
import s from './Timesheet.module.scss'
import { useStore } from '../../app/IoC/container'
import { useParams } from 'react-router-dom'
import { YouTrackApi } from '../../app/abstracts/interfaces/YouTrackApi.interface'
import { useAuthRedirect } from '../../hooks/useAuthRedirect'
import cn from 'classnames'
import { observer } from 'mobx-react'
import { Document, Page, PDFDownloadLink } from '@react-pdf/renderer'
import { InclinedButton } from '../../components/UIElements/InclinedButton/InclinedButton'
import { DataTableCell, Table, TableBody, TableCell, TableHeader } from '@david.kucsai/react-pdf-table'

export const Timesheet = observer(() => {
  const { issueid } = useParams()

  useAuthRedirect()

  const { ApptrixApi, YouTrackApi } = useStore()

  const apptrixApi = ApptrixApi
  const ytrApi = YouTrackApi

  useEffect(() => {
    if (apptrixApi.isLogged) {
      ytrApi.fetchWorkItems()
    }
  }, [apptrixApi.isLogged])

  return <div className={s.timeSheetPage}>
    <div className={s.timeSheetTable}>
      <div className={cn(s.row, s.header)}>
        <div className={s.item}>UserName</div>
        <div className={s.item}>Duration</div>
      </div>
      <WorkItems ytrApi={ytrApi} issueid={issueid || ''} />
    </div>
    <PDFDownloadLink document={<PDF ytrApi={ytrApi} issueid={issueid || ''} />}
                     fileName='timesheet.pdf'>
      {({ blob, url, loading, error }) => (loading ?
        <InclinedButton disabled label={'Exporting...'} /> : <InclinedButton label={'Export to PDF'} />)}
    </PDFDownloadLink>
  </div>
})


export const WorkItems = observer(({ ytrApi, issueid }: { ytrApi: YouTrackApi, issueid: string }) => {
  return <>
    {ytrApi.getWorkitemsFromIssue(issueid).map(wi => (
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
  if (hours > 0 && minutes > 0) {
    return `${hours} hours ${minutes} minutes`
  } else if (hours > 0 && minutes === 0) {
    return `${hours} hours`
  } else if (minutes > 0 && hours === 0) {
    return `${minutes} minutes`
  }
}
const PDF = observer(({ ytrApi, issueid }: { ytrApi: YouTrackApi, issueid: string }) => (
  <Document>
    <Page size='A4'>
      <Table
        data={ytrApi.getWorkitemsFromIssue(issueid)}
      >
        <TableHeader>
          <TableCell>
            UserName
          </TableCell>
          <TableCell>
            Duration
          </TableCell>
        </TableHeader>
        <TableBody>
          <DataTableCell getContent={(r) => r.author.fullName} />
          <DataTableCell getContent={(r) => formatTime(r.duration.minutes)} />
        </TableBody>
      </Table>
    </Page>
  </Document>
))
