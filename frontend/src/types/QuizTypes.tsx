export interface QuizCoverType {
    id?: String
    title: String
    tags: String[]
    image: String
    imageFile?: File
}

export interface QuizQuestionType {
    row?: Number
    column?: Number
    id? : String | Number
    price: Number
    text: String
    type?: QuizContentTypes
    answer: String
    wrongAnswers?: String
    src?: String
    file?: File
}

export interface QuizRowType {
    title: String
    questions: QuizQuestionType[]
}

// export interface QuizFinalQuestionType {
//     title: String
//     text: String
//     answer: String
// }

export type QuizContentTypes = "audio" | "text" | "image"