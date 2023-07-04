import React from 'react'
import classNames from 'classnames'
import cl from './Day.module.scss'

const Day = () => {
    const hours = Array.from({ length: 24 }, (_, index) => index)

    return (
        <div className={cl.day}>
            {hours.map(hour => (
                <div key={hour} className={classNames(cl.row, (hour < 8 || hour > 18) && cl.offHour)}>
                    <div className={cl.subRow}>
                        <div className={cl.notices}>
                            {/* {hours.map(i => <div className={cl.notice}>{i}</div>)} */}
                        </div>
                    </div>
                    <div className={cl.subRow}>
                        <div className={cl.notices}>
                            {/* {hours.map(i => <div className={cl.notice}>{i}</div>)} */}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export { Day }