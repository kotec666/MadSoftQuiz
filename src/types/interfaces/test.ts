import {AnswerType} from "../enums/test.ts";


interface IAnswer {
    id: number
    answer: string
}

export interface IQuestion {
    id: number
    text: string
    type: AnswerType | string
    rightAnswer?: number
    rightAnswers?: number[]
    answers?: IAnswer[]
}


export interface ITest {
    id: number
    name: string
    description: string
    timeToEnd: string
    questions: IQuestion[]
}

export interface IResultAnswer {
    answerId?: number | string
    answersId?: number[] | string[] | undefined
    longAnswer?: string
    shortAnswer?: string
}



