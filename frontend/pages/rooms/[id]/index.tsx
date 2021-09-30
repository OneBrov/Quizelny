import { Button, Container, Grid, Paper, Tooltip, Typography } from '@material-ui/core'
import React from 'react'
import { BackgroundBlock } from '../../../components/BackgroundBlock'
import { UserCard } from '../../../components/cards/UserCard'
import { Chat } from '../../../components/Chat'
import { MainLayout } from '../../../components/layouts/MainLayout'
import { RoomStore } from '../../../src/store/Room'

export default function Room() {
    const [userCount, setUserCount] = React.useState<number>(3)
    
    const handleAddUser = () => {
        setUserCount(userCount + 1)
    }   
    const roomStore = new RoomStore()
    
    return (
        <MainLayout>
            <Container className="mt-20 h100p flex-auto" maxWidth={false} >
            <BackgroundBlock className="h100p d-flex flex-column">
                <Grid container spacing={3} className="flex" >
                    <Grid  item xs={3} xl={2} className="d-flex flex-column justify-between" >
                        <div className="p-20">
                            <Typography variant="h4" className="mb-10" >
                                Ведущий:
                            </Typography>
                            <UserCard name="aboba"  />
                        </div>
                        <div className="d-flex flex-column ">
                            <Tooltip title="Если вы знаете ответ, нажмите на эту кнопку">
                                <Button 
                                    className="mb-10 ml-10 mr-10" 
                                    variant="contained" 
                                    size="large"
                                >
                                    Ответить!
                                </Button>  
                            </Tooltip>
                            {/* <Typography className="mb-50" variant="h4" align="right">
                                Список игроков:
                            </Typography> */}
                        </div>
                    </Grid>
                    <Grid item xs={9}>
                        <div className="d-flex  h100p p-10">
                             <Paper className="flex-auto p-10" elevation={3}  variant="outlined" >
                                 mainContent
                             </Paper>
                             <Chat/>
                        </div>
                    </Grid>
                </Grid>   
                <div className="d-flex mt-20 p-10">
                    <div className="d-flex flex-column w100p">
                        <Typography variant="h4">
                            Игроки:
                        </Typography>
                        <div className="d-flex ml-20 mt-10 mb-20 justify-center">

                            {[...Array(userCount)].map(( user, it) =>
                                <UserCard key={it} className="mr-10" name="aboba"  />
                            )}
                            <Button 
                                size="small" 
                                style={{paddingTop: "0px"}} 
                                onClick={handleAddUser}
                            >
                                <UserCard
                                    className="pt-0"
                                    name="Добавить пользователя" 
                                    image="/static/addUser.svg" 
                                />
                            </Button>
                        </div>
                    </div>
                   
                </div>
            </BackgroundBlock>
            </Container>    
        </MainLayout>
    )
}
