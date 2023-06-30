import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { checkDateInRange } from '../../utils/dateUtils'
import { } from '../../components/components'
import cl from './MonthPage.module.scss'
import { usePathnameEffect } from '../../hooks/usePathnameEffect'

const MonthPage = () => {
    const params = useParams()

    usePathnameEffect(params)

    return (
        <div>MonthPage {params.month}.{params.year}</div>
    )
}

export { MonthPage }