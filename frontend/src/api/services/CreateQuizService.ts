import { AxiosResponse } from 'axios'
import Cover from '../../store/Cover'
import { QuizCoverType, QuizRowType } from '../../types/QuizTypes'
import { AuthResponse } from '../../types/responses/AuthResponse'
import { CreateQuestionResponse, CreateQuizResponse, CreateRoundResponse } from '../../types/responses/CreateQuizResponse'
import $api from '../http'
import CreateQuestionService from './CreateQuestionService'

export default class CreateQuizService {
    static async uploadQuiz(cover: QuizCoverType, rounds: string[], finalRound: string | undefined): Promise<AxiosResponse<AuthResponse>> {
        const formData = new FormData()
        
        formData.append("name", cover.title.toString())
        cover.tags.forEach(tag => 
            formData.append("tags[]", tag.toString())
        )
        rounds.forEach( round => 
            formData.append("rounds[]", round)
        )
        finalRound&&formData.append("finalRound", finalRound.toString())
        cover.imageFile&&formData.append("image", cover.imageFile)
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
          }}
        return $api.post<AuthResponse>('/quizzes',formData, config)
    }

    //round - round content, title - main round title
    static async uploadRound(rows : {title: string, questions: string[]}[], title: string): Promise<AxiosResponse<CreateRoundResponse>> {
        return $api.post<CreateRoundResponse>('/rounds', {title, rows})
    }

    static async createRound(round : QuizRowType[], title: string): Promise<AxiosResponse<CreateRoundResponse>> {
        const questionsPromises = round.map(
            ({questions, title}) => 
                CreateQuestionService.createArrayQuestions(questions)
                    .then(
                        (questionsIDs) => {return {title: title.toString(), questions: questionsIDs as string[]}}
                    )
        )
        const loadedRows =  await Promise.all(questionsPromises)
        return this.uploadRound(loadedRows, title)
    }


    static async createQuiz(
        cover: QuizCoverType, rounds: QuizRowType[][], finalRound: QuizRowType[]
        ) {
        const roundPromises = rounds.map((round:QuizRowType[], it) =>   // adding rounds
             this.createRound(round, `Раунд ${it + 1}` )
        )
        roundPromises.push(this.createRound(finalRound, "Финал"))  //adding final round promise
        const roundsIds: string[] = await Promise.all(roundPromises)
            .then((responses) => responses.map( ({data}) => data._id) )

        const finalRoundId = roundsIds.pop() 
        const quizResponse = await this.uploadQuiz(cover, roundsIds, finalRoundId) // creating quiz and cover inside
        console.log(quizResponse.data);
        console.log(cover.imageFile);
        
        return true
    }

    
}