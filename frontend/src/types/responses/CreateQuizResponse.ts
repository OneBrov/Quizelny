import { QuizQuestionType, QuizRowType } from "../QuizTypes";
import { UserType } from "../UserType";

export interface CreateQuestionResponse extends QuizQuestionType {
    _id: string 
}

export interface CreateRoundResponse {
    _id: string
    title: string
    rows: QuizRowType[]
}

export interface CreateQuizResponse {
    _id: string
}