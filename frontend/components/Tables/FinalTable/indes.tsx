import { Button, Typography } from '@material-ui/core'
import React from 'react'
import { QuizFinalQuestionType } from '../../../src/types/QuizTypes'
import { QuizTable } from '../QuizTable'
import styles from './FinalTable.module.scss'


interface RoundTableParams {
    data: QuizFinalQuestionType[]
    onClickQuestion: (question: QuizFinalQuestionType) => void
}

export const FinalTable:React.FC<RoundTableParams> = ({data, onClickQuestion}) => {
    
    const [notCompleted, setNotCompleted] = React.useState<boolean[]>([])
    
    
    React.useEffect(()=>{
        const updatedList = data.map( q =>
            q.answer&&q.text&&q.title ?
                true : 
                false
        )
        setNotCompleted(updatedList)
    }, [data])

    return (
        <QuizTable>
            {data.map((question, iter ) =>
                <tr key={iter} className={styles.questionBackground}>
                    <td className={!notCompleted[iter] ? styles.notCompleted : ""}>
                        <Button onClick={()=> onClickQuestion(question)} className="w100p h100p" >
                            <Typography variant="h5">
                                {question.title}
                            </Typography>
                        </Button>
                    </td>
                </tr>
            )}
        </QuizTable>
    )
}
