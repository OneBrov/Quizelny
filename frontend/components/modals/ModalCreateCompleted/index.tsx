import { Button, DialogActions, DialogContent, Typography } from '@material-ui/core';
import React from 'react'
import { ModalBox } from '../ModalBox';

 interface ModalCreateCompletedProps {
    isOpen: boolean
    onClose: () => void
    onUploadQuiz: () => void
 }

export const ModalCreateCompleted:React.FC<ModalCreateCompletedProps> = ({
    isOpen, onClose, onUploadQuiz
}) => {
    return (
        <ModalBox 
            isOpen={isOpen} 
            onClose={onClose} 
            title="Завершение создания викторины"
        >
            
            <DialogContent className="mb-10">
                <Typography variant="body1" align="center" >
                    Вы успешно создали викторину! Найти свою викторину вы можете у себя в профиле, либо с помощью кнопки снизу
                </Typography>
            </DialogContent>
            <DialogActions >
                <Button 
                    onClick={()=> {onClose()} }  
                    variant="outlined"   
                >
                    Вернуться к редактированию
                </Button>
                <Button 
                    onClick={onUploadQuiz}  
                    variant="contained"   
                >
                    Перейти к созданной викторине
                </Button>
            </DialogActions>
          
        </ModalBox>
    )
}

