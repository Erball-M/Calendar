import React, { useEffect, useLayoutEffect, useState } from 'react'
import classNames from 'classnames'
import { Button, Checkbox, IcoWrapper, TextField, Select } from '../components'
import { ClockIco, GeoIco, BellIco } from '../../images/images'
import cl from './AddNoticeForm.module.scss'

const options = [
    { value: '_', label: 'Никогда' },
    { value: '0 мин', label: 'За 0 мин' },
    { value: '5 мин', label: 'За 5 мин' },
    { value: '15 мин', label: 'За 15 мин' },
    { value: '30 мин', label: 'За 30 мин' },
    { value: '1 ч', label: 'За 1 ч' },
    { value: '12 ч', label: 'За 12 ч' },
    { value: '1 дн', label: 'За 1 дн.' },
    { value: '1 нед', label: 'За 1 нед.' },
]

const AddNoticeForm = ({ eventData, setEventData, submitHandler }) => {
    useLayoutEffect(() => {
        if (eventData.allDay) {
            setEventData({ ...eventData, alarm: '12 ч' })
        } else if (!eventData.allDay) {
            setEventData({ ...eventData, alarm: '15 мин' })
        }
    }, [eventData.allDay])

    return (
        <form className={cl.form} onSubmit={submitHandler}>
            <fieldset className={cl.fieldset}>
                <TextField
                    large
                    className={cl.eventNameField}
                    placeholder='Название события'
                    value={eventData.eventName}
                    onChange={e => setEventData({ ...eventData, eventName: e.target.value })}
                />
                <Checkbox
                    checked={eventData.allDay}
                    onChange={e => setEventData({ ...eventData, allDay: e.target.checked })}
                >
                    Весь день
                </Checkbox>
            </fieldset>
            <fieldset className={cl.fieldset}>
                <IcoWrapper>
                    <ClockIco />
                </IcoWrapper>
                <div className={cl.fields}>
                    <TextField
                        value={eventData.start}
                        onChange={e => setEventData({ ...eventData, start: e.target.value })}
                        disabled={eventData.allDay}
                    />
                    -
                    <TextField
                        className={classNames(cl.textField)}
                        value={eventData.end}
                        onChange={e => setEventData({ ...eventData, end: e.target.value })}
                        disabled={eventData.allDay}
                    />
                </div>
            </fieldset>
            <TextField
                placeholder='Место'
                ico={<GeoIco />}
                value={eventData.placeName}
                onChange={e => setEventData({ ...eventData, placeName: e.target.value })}
            />
            <fieldset className={cl.fieldset}>
                <IcoWrapper>
                    <BellIco />
                </IcoWrapper>
                <span>Напомнить мне:</span>
                <Select
                    value={eventData.alarm}
                    onChange={e => setEventData({ ...eventData, alarm: e.target.dataset.value })}
                    options={options}
                />
            </fieldset>
            <div className={cl.btns}>
                <Button className={cl.moreBtn} type='button'>
                    Подробнее
                </Button>
                <Button className={cl.saveBtn} type='submit'>
                    Сохранить
                </Button>
            </div>
        </form>
    )
}

export { AddNoticeForm }