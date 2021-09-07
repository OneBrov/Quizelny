export interface QuizCoverType {
    id?: String
    title: String
    tags: String[]
    picture: String
}

export interface QuizQuestionType {
    id? : String | Number
    price: Number
    text: String
    type?: "text" | "audio" | "picture"
    answer: String
    wrongAnswers?: String
}

export interface QuizRowType {
    title: String
    row: QuizQuestionType[]
}


export type QuizContentTypes = "audio" | "text" | "picture"