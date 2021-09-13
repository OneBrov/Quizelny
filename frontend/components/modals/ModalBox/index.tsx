import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import React from 'react'
import styles from './ModalBox.module.scss'

interface ModalCreateQuestionProps {
    isOpen: boolean
    onClose: ()=>void
    title: String
}

export const ModalBox:React.FC<ModalCreateQuestionProps> = 
({title, isOpen=false, onClose, children}) => {
    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                
            >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent className={styles.modal}>
                {children}
            </DialogContent>
            </Dialog>
      </div>
    )
}



