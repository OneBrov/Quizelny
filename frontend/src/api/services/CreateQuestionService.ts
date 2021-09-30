import { AxiosResponse } from 'axios'
import { QuizQuestionType } from '../../types/QuizTypes'
import { CreateQuestionResponse } from '../../types/responses/CreateQuizResponse';
import $api from '../http'

export default class CreateQuestionService {
    static async createQuestion(question: QuizQuestionType): Promise<AxiosResponse<CreateQuestionResponse>> {
        return await $api.post<CreateQuestionResponse>('/questions', {...question})
    }

    static async createArrayQuestions(questions: QuizQuestionType[]) {
        const questionPromises = questions.map((q) => 
            new Promise( (resolve) => 
                    CreateQuestionService.createQuestion(q).then((response) => resolve(response.data._id))
            ) 
        )
        return await Promise.all(questionPromises)
    }
}

// .then(
//     (responses) =>{ 
//         questionsIds.push(responses.map(
//             ({data}) => data._id
//         ))
//     })