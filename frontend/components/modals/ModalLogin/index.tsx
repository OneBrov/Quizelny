import { Button, DialogActions, DialogContent, DialogContentText, List, ListItem, TextField } from '@material-ui/core'
import React from 'react'
import { ModalBox } from '../ModalBox'
import User from '../../../src/store/User'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/dist/client/router'

interface ModalLoginProps {
    type: 'registration' | 'login'
    changeType: ()=>void
}

export const ModalLogin:React.FC<ModalLoginProps> = observer(({
    type, changeType
}) => {
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [message, setMessage] = React.useState<string>('')
    const router = useRouter()
    
    const handleLogin = async () => {
        const err = await User.login(email, password)
        if (err) {
            setMessage(err)
        } else {
            User.user.isActivated&&router.push('/') 
        }
    }

    const handleRegistration = async () => {
        const err = await User.registration(email, password)
        if (err) {
            setMessage(err)
        } else {
            changeType()
        }
    }

    return (
        <ModalBox 
            title= { type === 'login' ? "Авторизация" : "Регистрация"}
            isOpen
        >
            <DialogContent dividers>
                <div className="d-flex flex-column">
                   
                        <TextField 
                                id="email"
                                className="mb-10"
                                value={email} 
                                label="Email" 
                                onChange={(e)=> setEmail(e.target.value)}
                            />
                        <TextField 
                            id="password"
                            value={password} 
                            label="Password"
                            type="password" 
                            autoComplete="on"

                            onChange={(e)=> setPassword(e.target.value)}
                        />
                    
                </div>
                <DialogContentText className="mt-10" >
                    {message}
                    { User.isAuth&&!User.user.isActivated && "Для завершения регистрации, подтвердите аккаунт по почте."  }
                </DialogContentText>
            </DialogContent>  
            <DialogActions>
            <Button 
                    variant="outlined"
                    onClick={changeType}
                >
                    { type === 'login' ? "Перейти к регистрации": "Перейти к авторизации"}
                </Button>
                <Button 
                    variant="contained" 
                    onClick={ type === 'login' ? 
                        handleLogin :
                        ()=> User.registration(email, password)
                    }  
                >
                    {type === 'login' ? 'Войти' : "Зарегистрироваться"}
                </Button>
            </DialogActions>
        </ModalBox>
    )
})
