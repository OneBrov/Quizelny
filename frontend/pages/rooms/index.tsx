import { Container, Typography } from '@material-ui/core'
import React from 'react'
import { SearchButton } from '../../components/Buttons/SearchButton'
import { MainLayout } from '../../components/layouts/MainLayout'
import { TitleLine } from '../../components/TitleLine'
import Image from 'next/image'
import styles from "./rooms.module.scss"
import { RoomCard } from '../../components/cards/RoomCard'

export default function Rooms() {
    return (
        <MainLayout>
             <TitleLine mainTitle="Список комнат" >
                 <SearchButton />
             </TitleLine>
            <div className="d-flex justify-end mr-40 ml-40 align-center">
                <Image src="/static/sort.svg" width={40} height={40} alt=""/>
                <Typography variant="h5" color="primary">Сортировать</Typography>
            </div>
            <Container className={styles.rooms}> 
                <div className="d-flex flex-column">
                    <Typography variant="h5">
                        Количество комнат: 3
                    </Typography>
                    <RoomCard 
                        name="The First" 
                        quizName="Quiiizy" 
                        withPassword={false} 
                        userCount={10} 
                        roomId="1" 
                        status="Ожидание"
                    />

                    <RoomCard 
                        name="The First" 
                        quizName="Quiiizy" 
                        withPassword={true} 
                        userCount={10} 
                        roomId="2" 
                        status="В игре"
                    />

                    <RoomCard 
                        name="The First" 
                        quizName="Quiiizy" 
                        withPassword={true} 
                        userCount={10} 
                        roomId="3" 
                        status="В игре"
                    />
                </div>
            </Container>
        </MainLayout>
    )
}
