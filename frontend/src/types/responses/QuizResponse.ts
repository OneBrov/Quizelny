export interface QuizResponse {
    _id: string
    name: string
    tags: string[]
    image: string
    date: Date
    playCount: number
    rounds: {title: string, rows: QuizRowWithTitle[] }[]
    finalRound: {title: string, rows: QuizRowWithTitle[]}
}

export interface QuizRowWithTitle {
    title: string, questions: string[]
}