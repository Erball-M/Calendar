import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { usePageNavigate, useScrollNavigate } from '../../hooks/hooks'
import { MonthNames } from '../../constans/dateNames'
import { Container, Button, Toggler } from '../components'
import { YearIco, MonthIco, WeekIco, DayIco, KebabMenuIco, ArrowIco } from '../../images/images'
import cl from './Header.module.scss'

const Header = () => {
    const params = useParams()

    const forceScroll = useScrollNavigate()

    // TEMPORARY!!!
    const [theme, setTheme] = useState(false)
    const themeToggler = () => {
        const newTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
        setTheme(!theme)
        document.body.setAttribute('data-theme', newTheme)
    }

    const prevBtnRef = useRef()
    const nextBtnRef = useRef()

    useEffect(() => {
        function leafOver(e) {
            const code = e.code
            switch (code) {
                case 'ArrowLeft':
                    prevBtnRef.current.click()
                    break
                case 'ArrowRight':
                    nextBtnRef.current.click()
                    break
            }
        }
        window.addEventListener('keydown', leafOver)
        return () => window.removeEventListener('keydown', leafOver)
    }, [])

    const {
        yearNavigate,
        monthNavigate,
        dayNavigate,
        weekNavigate,
        todayNavigate,
        next,
        prev
    } = usePageNavigate(forceScroll)

    return (
        <div className={cl.header}>
            <Container className={cl.container}>
                <div className={cl.navigate}>
                    <div className={cl.btnsGroup}>
                        <Button onClick={prev} large ref={prevBtnRef}>
                            <ArrowIco style={{ rotate: '180deg' }} />
                        </Button>
                        <Button onClick={next} large ref={nextBtnRef}>
                            <ArrowIco />
                        </Button>
                    </div>
                    <h2 className={cl.caption}>{MonthNames[params.month - 1]} {params.year} г.</h2>
                </div>
                <div className={cl.controls}>
                    <div className={cl.btnsGroup}>
                        <Button
                            onClick={todayNavigate}
                            className={cl.separatedBtn}
                        >
                            <DayIco />
                            Сегодня
                        </Button>
                        <Button onClick={dayNavigate}>
                            <DayIco />
                            День
                        </Button>
                        <Button onClick={weekNavigate}>
                            <WeekIco />
                            Неделя
                        </Button>
                        <Button onClick={monthNavigate}>
                            <MonthIco />
                            Месяц
                        </Button>
                        <Button onClick={yearNavigate}>
                            <YearIco />
                            Год
                        </Button>
                        <Button onClick={() => { }}>
                            <KebabMenuIco />
                        </Button>
                    </div>
                    <Toggler value={theme} onClick={themeToggler}>
                        Сменить тему
                    </Toggler>
                </div>
            </Container>
        </div>
    )
}

export { Header }