import { Button, DialogActions, DialogContent, MenuItem, TextField, Tooltip } from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import React from 'react'
import { ModalBox } from '../ModalBox'

interface ModalRoomCreateProps {
    onClose: ()=>void
    isOpen: boolean
}

export const ModalRoomCreate:React.FC<ModalRoomCreateProps> = ({
    onClose, isOpen
}) => {
    const router = useRouter()
    const [roomName, setRoomName] = React.useState<String>("")
    const [userCount, setUserCount] = React.useState<Number>(3)
    const [quiz, setQuiz] = React.useState<String>("")
    const [password, setPassword] = React.useState<String>("")
    
    return (
        <ModalBox 
            title="Создание комнаты"
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
                        label="Количество участников" 
                        type="number"
                        value={userCount}
                        onChange={(e) => setUserCount(Number(e.target.value))}
                    />
                    <Tooltip title="Отображаются только созданные вами или избранные викторины. Перед созданием комнаты, добавьте  викторину в избранное">



                    <TextField
                        className="mb-10"
                        variant="filled"
                        label="Выбор викторины" 
                        multiline 
                        value={quiz}
                        onChange={(e) => setQuiz(e.target.value)}
                        select
                    >
                        <MenuItem  value={"quiz 1"} >
                            Quiz1    
                        </MenuItem> 
                    </TextField>
                    </Tooltip>
                    <TextField
                        className="mb-10"
                        variant="filled"
                        label="Пароль" 
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
                    Создать комнату
                </Button>

            </DialogActions>
        </ModalBox>
    )
}
