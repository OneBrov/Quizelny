import { Button, DialogActions, DialogContent, MenuItem, TextField, Tooltip } from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import React from 'react'
import { ModalBox } from '../ModalBox'

interface ModalQuickEnterProps {
    onClose: ()=>void
    isOpen: boolean
}

export const ModalQuickEnter:React.FC<ModalQuickEnterProps> = ({
    onClose, isOpen
}) => {
    const router = useRouter()
    const [roomName, setRoomName] = React.useState<String>("")
    const [password, setPassword] = React.useState<String>("")

    
    return (
        <ModalBox 
            title="Присоединиться к комнате"
            isOpen={isOpen}
            onClose={onClose}
        >
            <DialogContent>
                <div className={`d-flex flex-column mb-30 `}>
                    <TextField 
                        variant="filled"
                        label="Имя комнаты" 
                        type="string" 
                        value={roomName}
                        onChange={(e)=>setRoomName(e.target.value)}
                        className="mb-10"
                    />
                    <TextField
                        className="mb-10"
                        variant="filled"
                        label="Пароль(при необходимости)" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={()=>router.push("/rooms")}  
                    variant="outlined"
                >
                    Перейти к списку комнат
                </Button>
                <Button 
                    variant="contained" 
                    onClick={onClose}  
                >
                    Присоединиться
                </Button>

            </DialogActions>
        </ModalBox>
    )
}
