import React from 'react'
import classNames from 'classnames'
import { IcoWrapper } from '../IcoWrapper/IcoWrapper'
import { TickIco } from '../../../images/images'
import cl from './Checkbox.module.scss'

const Checkbox = ({ children, className, ...props }) => {
    return (
        <label className={classNames(cl.label, className)}>
            <IcoWrapper className={cl.checkbox}>
                {props.checked && <IcoWrapper className={cl.ico}><TickIco /></IcoWrapper>}
            </IcoWrapper>
            <input
                type='checkbox'
                className={cl.input}
                {...props}
            />
            {children}
        </label>
    )
}

export { Checkbox }