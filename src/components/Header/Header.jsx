import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { usePageNavigate } from '../../hooks/hooks'
import { Container, Button, Toggler } from '../components'
import { YearIco, MonthIco, WeekIco, DayIco, KebabMenuIco } from '../../images/images'
import cl from './Header.module.scss'

const Header = () => {
    const params = useParams()

    // FOR REFACTORING!!!
    const [theme, setTheme] = useState(false)
    const themeToggler = () => {
        const newTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
        setTheme(!theme)
        document.body.setAttribute('data-theme', newTheme)
    }

    // const navigate = useNavigate()
    // const yearNavigate = () => navigate(`/${params.year || (new Date().getFullYear())}`)
    // const monthNavigate = () => navigate(`/${params.year}/${params.month || 1}`)
    // const weekNavigate = () => navigate('/')
    // const dayNavigate = () => navigate('/')

    const { yearNavigate, monthNavigate, dayNavigate } = usePageNavigate()

    return (
        <div className={cl.header}>
            <Container className={cl.container}>
                <div className={cl.navigate}>navigate</div>
                <div className={cl.controls}>
                    <div className={cl.btnsGroup}>
                        <Button
                            ico={<DayIco />}
                            onClick={() => console.log('click')}
                            className={cl.separatedBtn}
                        >
                            Сегодня
                        </Button>
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
                    <div className={cl.btnsGroup}>
                        <Button
                            ico={<KebabMenuIco />}
                            onClick={() => { }}
                        />
                        <Toggler value={theme} onClick={themeToggler}>
                            Сменить тему
                        </Toggler>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export { Header }