import React from 'react'
import { useParams } from 'react-router-dom'
import cl from './MonthPage.module.scss'

const MonthPage = () => {
    const {
        year = (new Date().getFullYear()),
        month = (new Date().getMonth() + 1),
    } = useParams()

    return (
        <div>MonthPage {month}.{year}</div>
    )
}

export { MonthPage }