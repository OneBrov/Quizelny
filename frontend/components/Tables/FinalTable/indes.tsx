import { Button, Typography } from '@material-ui/core'
import React from 'react'
import { QuizQuestionType, QuizRowType } from '../../../src/types/QuizTypes'
import { QuizTable } from '../QuizTable'
import styles from './FinalTable.module.scss'


interface RoundTableParams {
    data: QuizRowType[]
    onClickQuestion: (question: QuizQuestionType) => void
}

export const FinalTable:React.FC<RoundTableParams> = ({data, onClickQuestion}) => {
    
    const QuestionIsComplete = (questions: QuizQuestionType[], title: String) => {
        return questions[0].answer&&questions[0].text&&title ? true : false
    }
    
    return (
        <QuizTable>
            {data.map(({questions, title}, iter ) =>
                <tr key={iter} className={styles.questionBackground}>
                    <td className={!QuestionIsComplete(questions, title) ? styles.notCompleted : ""}>
                        <Button onClick={()=> onClickQuestion(questions[0])} className="w100p h100p" >
                            <Typography variant="h5">
                                {title}
                            </Typography>
                        </Button>
                    </td>
                </tr>
            )}
        </QuizTable>
    )
}
