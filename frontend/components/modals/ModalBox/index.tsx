import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import React from 'react'

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
            <DialogContent>
                {children}
            </DialogContent>
            </Dialog>
      </div>
    )
}



