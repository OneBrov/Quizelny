import { Button, DialogActions, DialogContent, MenuItem, TextField } from '@material-ui/core'
import { TextFields } from '@material-ui/icons'
import React from 'react'
import { QuizQuestionType } from '../../../types/QuizTypes'
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
    onChangePrice: (e:React.ChangeEvent<HTMLInputElement>, 
        question: QuizQuestionType) => void
}

export const ModalCreateQuestion:React.FC<ModalCreateQuestionProps> = 
({isOpen=false, onClose, onDelete, onChangePrice, question}) => {
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
                        onChange={(e) => onChangePrice(e, question)}
                    />
                    <TextField
                        className={styles.field} 
                        variant="filled"
                        label="Текст вопроса" 
                        multiline 
                    />
                    <TextField 
                        className={styles.field} 
                        variant="filled" 
                        label="Тип вопроса" 
                        value="text"
                        select
                    >
                        {PossibleQuestionTypes.map(type => 
                            <MenuItem key={type} value={type}>
                                {type}
                            </MenuItem> 
                        )} 
                    </TextField >
                    <TextField 
                        className={styles.field}
                        variant="filled"
                        label="Ответ на вопрос" 
                        multiline
                    />
                    <TextField 
                        className={styles.field}
                        variant="filled"
                        label="Неверные ответы" 
                        multiline 
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
}




