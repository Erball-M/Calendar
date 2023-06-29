import React from 'react'
import { useParams } from 'react-router-dom'
import cl from './DayPage.module.scss'

const DayPage = () => {
    const { year, month, day } = useParams()

    return (
        <div>DayPage {day}.{month}.{year}</div>
    )
}

export { DayPage }