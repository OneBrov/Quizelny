import { Button, Typography } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import { QuizQuestionType, QuizRowType } from '../../../types/QuizTypes'
import styles from './RoundTable.module.scss'


interface RoundTableParams {
    data: QuizRowType[]
    isCreation?: boolean
    onCreate? : ()=>void
    onClickCell: (question: QuizQuestionType) => void
}

export const RoundTable:React.FC<RoundTableParams> = ({data, isCreation, onCreate, onClickCell}) => {

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                </tr>
            </thead>
            <tbody>
                {data.map((row, iter ) =>
                    <tr key={iter}>
                        {!isCreation &&
                            <td className={styles.rowTitle}>
                                <Typography display="block" variant="h6">
                                    {row.title}
                                </Typography>
                            </td>   
                        }
                        
                        {row.row.map((cell, iter) =>
                            <td  key={iter} className={clsx(styles.cell,)}>
                                <Button onClick={()=> onClickCell(cell)} className="w100p h100p" >
                                    <Typography variant="h5">
                                        {cell.price}
                                    </Typography>
                                </Button>
                            </td>    
                        )}
                        {isCreation &&
                            <td key={iter} className={styles.createButton} >
                                <Button onClick={onCreate} className="w100p h100p" >
                                    <Typography variant="h5">
                                        Добавить вопрос
                                    </Typography>
                                </Button>
                            </td>    
                        }
                        
                    </tr>
                )}
            </tbody>
        </table>
    )
}
