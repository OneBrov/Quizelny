import { Button, DialogActions, DialogContent, MenuItem, TextField } from '@material-ui/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import QuestionRows from '../../../src/store/QuestionRows'
import { QuizContentTypes, QuizQuestionType } from '../../../types/QuizTypes'
import { FileButton } from '../../Buttons/FileButton'
import { ModalBox } from '../ModalBox'
import styles from './ModalCreateQuestion.module.scss'

const PossibleQuestionTypes = [
    "audio",
    "text",
    "picture"
]

interface ModalCreateQuestionProps {
    isOpen: boolean
    question: QuizQuestionType 
    onClose: ()=>void
    onDelete: ()=>void

}

export const ModalCreateQuestion:React.FC<ModalCreateQuestionProps> =
observer( 
({isOpen=false, onClose, onDelete, question}) => {
    return (
        <ModalBox 
            isOpen={isOpen} 
            onClose={onClose} 
            title="Создание вопроса"
        >
            <div>
            <DialogContent>
                <div className={`${styles.modal} d-flex flex-column `}>
                    <TextField 
                        className={styles.field}
                        variant="filled"
                        label="Стоимость вопроса" 
                        type="number" 
                        value={question.price}
                        onChange={(e)=>QuestionRows.changeQuestionPrice(Number(e.target.value))}
                    />
                    <TextField
                        className={styles.field} 
                        variant="filled"
                        label="Текст вопроса" 
                        multiline 
                        value={question.text}
                        onChange={(e) => QuestionRows.changeQuestionText(String(e.target.value))}
                    />
                    <TextField 
                        className={styles.field} 
                        variant="filled" 
                        label="Тип вопроса" 
                        select
                        value={ question.type || "text" }
                        onChange={(e)=> QuestionRows.changeQuestionType(e.target.value as QuizContentTypes)}
                    >
                        {PossibleQuestionTypes.map(type => 
                            <MenuItem key={type} value={type}>
                                {type}
                            </MenuItem> 
                        )} 
                    </TextField >

                    {(question.type === "audio" || question.type === "picture") &&
                        <FileButton 
                            value={null} 
                            onChange={()=>console.log("Changed")}
                            type={question.type==="audio"? "audio": "image"}
                        />
                    }

                    <TextField 
                        className={styles.field}
                        variant="filled"
                        label="Ответ на вопрос" 
                        multiline
                        value={question.answer}
                        onChange={e => QuestionRows.changeQuestionAnswer(e.target.value)}
                    />
                    <TextField 
                        className={styles.field}
                        variant="filled"
                        label="Неверные ответы" 
                        multiline 
                        value={question.wrongAnswers}
                        onChange={e => QuestionRows.changeQuestionWrongAnswer(e.target.value)}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={()=> {onDelete(); onClose()} }  
                    variant="outlined"   
                >
                    Удалить вопрос
                </Button>
                <Button 
                    variant="outlined" 
                    onClick={onClose}  
                >
                    Создать вопрос
                </Button>

            </DialogActions>
           </div>
        </ModalBox>
    )
})




