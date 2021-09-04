import { Typography } from '@material-ui/core'
import React from 'react'
import { CreateQuiz } from '../../../components/CreateQuiz'
import { MainLayout } from '../../../components/MainLayout'
import { TitleLine } from '../../../components/TitleLine'

export default function CreationPage() {
    return (
        <MainLayout>
            <TitleLine mainTitle="Создание викторины">
                <Typography className="mr-40" variant="h3">
                    Обложка
                </Typography>
            </TitleLine>
            <CreateQuiz />
        </MainLayout>
    )
}


