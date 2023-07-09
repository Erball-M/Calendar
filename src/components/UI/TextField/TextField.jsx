import React, { forwardRef } from 'react'
import classNames from 'classnames'
import { IcoWrapper } from '../IcoWrapper/IcoWrapper'
import cl from './TextField.module.scss'

const TextField = forwardRef(({ className, ico, large, ...props }, ref) => {
    return (
        <label className={classNames(cl.label, large && cl.large, className)}>
            {ico && <IcoWrapper>{ico}</IcoWrapper>}
            <input
                className={cl.textField}
                ref={ref}
                {...props}
            />
        </label>
    )
})

export { TextField }