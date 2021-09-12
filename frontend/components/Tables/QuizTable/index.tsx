import { Button, Typography } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import { QuizQuestionType, QuizRowType } from '../../../types/QuizTypes'

import styles from './QuizTable.module.scss'

export const QuizTable:React.FC = ({children}) => {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                </tr>
            </thead>
            <tbody>
                {children}
            </tbody>
        </table>
    )
}
