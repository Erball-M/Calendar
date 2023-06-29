import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { checkDateInRange } from '../../utils/dateUtils'
import { } from '../../components/components'
import cl from './MonthPage.module.scss'

const MonthPage = () => {
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const isInRange = checkDateInRange(params)
        // if (isInRange) {
        //     navigate(isInRange)
        // }
        console.log(isInRange, 'isInRangeMonthPage')
    }, [params])

    return (
        <div>MonthPage {params.month}.{params.year}</div>
    )
}

export { MonthPage }