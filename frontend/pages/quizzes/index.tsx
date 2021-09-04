import { Box, Container, Divider } from '@material-ui/core'
import React from 'react'
import { SearchButton } from '../../components/Buttons/SearchButton'
import { QuizCard } from '../../components/cards/QuizCard'
import { MainLayout } from '../../components/MainLayout'
import { TitleLine } from '../../components/TitleLine'

export default function Quizzes() {
    return (
        <MainLayout>   
            <TitleLine mainTitle="Список викторин">
                <SearchButton />
            </TitleLine>
            <Container>
                <Box  display="flex" flexDirection="column"  >
                    <QuizCard 
                        name="The first" 
                        tags={["anime", "history","aboba"]}
                        src="https://static-cdn.jtvnw.net/ttv-boxart/Among%20Us-144x192.jpg"
                        content={[["aboab", "babiba"],["habibaLorem"],["Ipsum", "doret", "Lorem"]]}
                    />
                </Box>

                <Divider />
                <Box  display="flex" flexDirection="column"  >
                    <QuizCard 
                        name="The first" 
                        tags={["anime", "history","aboba"]}
                        src="https://static-cdn.jtvnw.net/ttv-boxart/Among%20Us-144x192.jpg"
                        content={[["aboab", "babiba"],["habibaLorem"],["Ipsum", "doret", "Lorem"]]}
                    />
                </Box>

                <Divider />
                <Box  display="flex" flexDirection="column"  >
                    <QuizCard 
                        name="The first" 
                        tags={["anime", "history","aboba"]}
                        src="https://static-cdn.jtvnw.net/ttv-boxart/Among%20Us-144x192.jpg"
                        content={[["aboab", "babiba"],["habibaLorem"],["Ipsum", "doret", "Lorem"]]}
                    />
                </Box>
            </Container>
        </MainLayout> 

    )
}
