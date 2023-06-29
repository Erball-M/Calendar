import React from 'react'
import { useParams } from 'react-router-dom'
import cl from './YearPage.module.scss'

const YearPage = () => {
  const { year } = useParams()

  return (
    <div>YearPage {year}</div>
  )
}

export { YearPage }