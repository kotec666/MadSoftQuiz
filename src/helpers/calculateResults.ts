import {IQuestion, IResultAnswer} from "../types/interfaces/test.ts";
import {AnswerType} from "../types/enums/test.ts";

export const calculateResults =  (answers: Record<string, IResultAnswer>, questions: IQuestion[]):  { correct: number; incorrect: number } => {
    let correct = 0;
    let incorrect = 0;

    questions.forEach((question) => {
        switch (question.type) {
            case AnswerType.SINGLE_ANSWER:
                if (answers[question.id]?.answerId === `${question.rightAnswer}`) {
                    correct++;
                } else {
                    incorrect++;
                }
                break;
            case AnswerType.MULTI_ANSWER:
                const userAnswers = answers[question.id]?.answersId || [];
                const rightAnswers = question.rightAnswers || [];
                if (
                    userAnswers.length === rightAnswers.length &&
                    userAnswers.every((answer) => {
                        if (typeof answer === 'string') {
                            return rightAnswers.includes(parseInt(answer))
                        } else {
                            return rightAnswers.includes(answer)
                        }
                    })
                ) {
                    correct++;
                } else {
                    incorrect++;
                }
                break;
            case AnswerType.SHORT_ANSWER:
                break;
            case AnswerType.LONG_ANSWER:
                break;
        }
    });

    return { correct, incorrect };
}