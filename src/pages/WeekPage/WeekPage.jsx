import React from 'react'
import { useParams } from 'react-router-dom'
import cl from './WeekPage.module.scss'

const WeekPage = () => {
    const { year, month, week } = useParams()

    return (
        <div>WeekPage {month}.{year} week {week}</div>
    )
}

export { WeekPage }