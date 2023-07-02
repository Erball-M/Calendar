import React from 'react'
import classNames from 'classnames'
import cl from './Day.module.scss'

const Day = () => {
    const hours = Array.from({ length: 24 }, (_, index) => index)

    return (
        <div className={cl.hours}>
            {hours.map(hour => (
                <div key={hour} className={classNames(cl.hour__row, (hour < 8 || hour > 18) && cl.offHour)}>
                    <div className={cl.hour__subRow}>
                        {/* {hour} */}
                        {/* {hours.map(i => <div style={{ background: 'red', flex: '1', border: '1px solid black' }}>{i}</div>)} */}
                    </div>
                    <div className={cl.hour__subRow}>
                        {/* {hour} */}
                        {/* {hours.map(i => <div style={{ background: 'red', flex: '1', border: '1px solid black' }}>{i}</div>)} */}
                    </div>
                </div>
            ))}
        </div>
    )
}

export { Day }