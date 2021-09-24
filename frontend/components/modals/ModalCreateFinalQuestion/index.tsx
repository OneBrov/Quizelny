import { Button, DialogActions, DialogContent, TextField } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React from 'react'
import FinalQuestions from '../../../src/store/FinalQuestions';
import { QuizFinalQuestionType } from '../../../src/types/QuizTypes';
import { ModalBox } from '../ModalBox';


interface ModalCreateFinalQuestionProps {
    isOpen: boolean

    question: QuizFinalQuestionType
    onClose: () => void
    onDelete: () => void
}

export const ModalCreateFinalQuestion: React.FC<ModalCreateFinalQuestionProps> = observer((
    {isOpen,  question, onClose, onDelete}
) => {
    return (
    <ModalBox 
            isOpen={isOpen} 
            onClose={onClose} 
            title="Создание вопроса"
        >
            <div>
            <DialogContent>
                <div className={`d-flex flex-column mb-30 `}>
                    <TextField 
                        variant="filled"
                        label="Текст вопроса" 
                        type="number" 
                        multiline
                        value={question.text}
                        onChange={(e)=>FinalQuestions.changeText(e.target.value)}
                        className="mb-10"
                    />
                    <TextField
                        variant="filled"
                        label="Ответ на вопрос" 
                        multiline 
                        value={question.answer}
                        onChange={(e) => FinalQuestions.changeAnswer(e.target.value)}
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
                    Сохранить
                </Button>

            </DialogActions>
           </div>
        </ModalBox>
    )
})
