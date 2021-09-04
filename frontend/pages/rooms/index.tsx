import { Typography } from '@material-ui/core'
import React from 'react'
import { SearchButton } from '../../components/Buttons/SearchButton'
import { MainLayout } from '../../components/MainLayout'
import { TitleLine } from '../../components/TitleLine'
import Image from 'next/image'


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
        </MainLayout>
    )
}
