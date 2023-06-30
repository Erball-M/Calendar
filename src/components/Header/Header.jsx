import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Container, Button } from '../components'
import { YearIco, MonthIco, WeekIco, DayIco } from '../../images/images'
import cl from './Header.module.scss'

const Header = () => {
    const params = useParams()
    const navigate = useNavigate()

    const yearNavigate = () => navigate(`/${params.year || (new Date().getFullYear())}`)
    const monthNavigate = () => navigate(`/${params.year}/${params.month || 1}`)
    const weekNavigate = () => navigate('/')
    const dayNavigate = () => navigate('/')

    return (
        <div className={cl.header}>
            <Container className={cl.container}>
                <div className={cl.navigate}>navigate</div>
                <div className={cl.controls}>
                    <Button
                        ico={<DayIco />}
                        onClick={() => console.log('click')}
                    >
                        День
                    </Button>
                    <Button
                        ico={<WeekIco />}
                        onClick={() => console.log('click')}
                    >
                        Неделя
                    </Button>
                    <Button
                        ico={<MonthIco />}
                        onClick={monthNavigate}
                    >
                        Месяц
                    </Button>
                    <Button
                        ico={<YearIco />}
                        onClick={yearNavigate}
                    >
                        Год
                    </Button>
                </div>
            </Container>
        </div>
    )
}

export { Header }