import { Box, Container, Divider } from '@material-ui/core'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { SearchButton } from '../../components/Buttons/SearchButton'
import { QuizCard } from '../../components/cards/QuizCard'
import { MainLayout } from '../../components/layouts/MainLayout'
import { TitleLine } from '../../components/TitleLine'
import GetQuizService from '../../src/api/services/GetQuizzesService'
import { QuizResponse } from '../../src/types/responses/QuizResponse'

export default function Quizzes() {
    const [quizzes, setQuizzes] = React.useState<QuizResponse[]>([])
    const router = useRouter()



    React.useEffect(() => {
        const getQuizzes = async () => {
            const {name, id} = router.query
            const {data} = await GetQuizService.getAll(id as string, name as string)
            setQuizzes(data)
        }
        getQuizzes()
    }, [router.query])


    
    return (
        <MainLayout>   
            <TitleLine mainTitle="Список викторин">
                <SearchButton 
                    onChange={(e)=> router.push({query: {name: e}})}
                />
            </TitleLine>
            <Container>

                <Divider />
                <Box  display="flex" flexDirection="column"  >
                    {quizzes.map(quiz => 
                    <Box key={quiz._id} display="flex" flexDirection="column">
                        <QuizCard 
                          
                            name={quiz.name}
                            tags={quiz.tags}
                            src={quiz.image}
                            content={[...quiz.rounds, (quiz.finalRound&&quiz.finalRound)]}
                        />    

                        <Divider />
                    </Box>
                    )}
                    {/* <QuizCard 
                        name="The first" 
                        tags={["anime", "history","aboba"]}
                        src="https://static-cdn.jtvnw.net/ttv-boxart/Among%20Us-144x192.jpg"
                        content={[["aboab", "babiba"],["habibaLorem"],["Ipsum", "doret", "Lorem"]]}
                    />
                </Box>
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
                        name="No picture" 
                        tags={["ilia", "abobnik","huibnik"]}
                        content={[["ilia", "abobobobob"],["huihlallala"],["biba", "boba", "Lorem"]]}
                    />
                </Box>
                <Divider />
                <Box  display="flex" flexDirection="column"  >
                    <QuizCard 
                        name="No picture" 
                        tags={["ilia", "abobnik","huibnik"]}
                        content={[["ilia", "abobobobob"],["huihlallala"],["biba", "boba", "Lorem","biba", "boba", "Lorem","biba", "boba", "Lorem","biba", "boba", "Lorem","biba", "boba", "Lorem","biba", "boba", "Lorem","biba", "boba", "Lorem","biba", "boba", "Lorem","biba", "boba", "Lorem","biba", "boba", "Lorem","biba", "boba", "Lorem","biba", "boba", "Lorem"]]}
                    /> */}
                </Box>
            </Container>
        </MainLayout> 

    )
}
