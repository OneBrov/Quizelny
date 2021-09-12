import { Button, IconButton, Tooltip, Typography } from '@material-ui/core'
import React from 'react'
import Image from 'next/image'

import styles from './RoomCard.module.scss'



interface RoomCardProps {
    name: String
    quizName: String
    withPassword: boolean   
    userCount: Number
    roomId: String
    status: "Ожидание" | "В игре"
}

export const RoomCard:React.FC<RoomCardProps> = ({
    name, quizName, withPassword=false, userCount=0, roomId, status 
}) => {
    return (
        <div className={`${styles.room} d-flex flex-column p-10 justify-between`}>
            <div className="d-flex justify-between align-center">
                <Typography variant="h6">
                    Имя комнаты: {name}
                </Typography>
                <Typography variant="body1">
                    Количество участников: {userCount} /10
                </Typography>
            </div>
            <div className="d-flex justify-between " >
                <Typography variant="body1">
                    Викторина: {quizName}
                </Typography>
                <div className="d-flex align-center">
                    <div className="mr-10">
                        <Typography variant="body2">
                            Статус: {status}
                        </Typography>
                    </div>
                    <div className="mr-10">
                        {withPassword  ? 
                            <Tooltip title="Для входа в комнату, требуется пароль">
                                <IconButton size="small">
                                    <Image src="/static/locked.svg" width={24} height={24} alt="Locked" />
                                </IconButton>
                            </Tooltip> :
                                <Tooltip title="Можно войти без пароля">
                                    <IconButton size="small">
                                        <Image src="/static/unlocked.svg" width={24} height={24} alt="Locked" />
                                    </IconButton>
                                </Tooltip> 

                        }

                    </div> 
                    <div className="mr-10">
                        <Button href={roomId.toString()} variant="contained">
                            Войти
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
