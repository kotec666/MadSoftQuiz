import {IQuestion} from "../../../types/interfaces/test.ts";
import {AnswerType} from "../../../types/enums/test.ts";

interface IStepFormElementProps extends IQuestion {
    data: any
    setValue: (name: string | number, value: any) => void
}

const StepFormElement = (props: IStepFormElementProps) => {

    return (
        <div
            className="bg-white shadow-md rounded-lg p-8"
        >
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-[30px]">
                    {props.text}
                </h2>
            </div>

            {props.type === AnswerType.SHORT_ANSWER && (
                <div>
                    <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Ваш ответ..."
                        value={props.data?.formAnswers?.[props.id]?.shortAnswer}
                        onChange={(e) => {
                            props.setValue(props.id, {shortAnswer: e.target.value})
                        }}
                    />
                </div>
            )}


            {props.type === AnswerType.SINGLE_ANSWER && (
                <div className="flex flex-col gap-y-[20px]">
                    {
                        props?.answers?.map((answer) => (
                            <div key={answer.id} className="flex items-center">
                                <input
                                    id={`radio-${answer.id}`}
                                    type="radio"
                                    value={answer.id}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    checked={props.data?.formAnswers?.[props.id]?.answerId === `${answer.id}`}
                                    onChange={(e) => {
                                        props.setValue(props.id, {
                                                answerId: e.target.value
                                            }
                                        )
                                    }}
                                />
                                <label
                                    htmlFor={`radio-${answer.id}`}
                                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    {answer.answer}
                                </label>
                            </div>
                        ))
                    }
                </div>
            )}


            {props.type === AnswerType.MULTI_ANSWER && (
                <div className="flex flex-col gap-y-[20px]">
                    {
                        props?.answers?.map((answer) => (
                                <div key={answer.id} className="flex items-center">
                                    <input
                                        id={`checkbox-${answer.id}`}
                                        type="checkbox"
                                        value={answer.id}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        checked={props.data?.formAnswers?.[props.id]?.answersId?.includes(`${answer.id}`)}
                                        onChange={(e) => {
                                            let alreadyIncludes = props.data.formAnswers?.[props.id]?.answersId?.includes(e.target.value)

                                            if (alreadyIncludes) {
                                                const withoutThisElement = props.data.formAnswers?.[props.id]?.answersId?.filter((element: string) => element !== e.target.value)

                                                return props.setValue(props.id, {
                                                    answersId: withoutThisElement
                                                })
                                            }

                                            return props.setValue(props.id, {
                                                answersId: props.data.formAnswers?.[props.id]?.answersId?.length !== undefined ? [e.target.value, ...props.data.formAnswers?.[props.id]?.answersId] : [e.target.value],
                                            })
                                        }}
                                    />
                                    <label
                                        htmlFor={`checkbox-${answer.id}`}
                                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                        {answer.answer}
                                    </label>
                                </div>
                            )
                        )
                    }
                </div>
            )}


            {props.type === AnswerType.LONG_ANSWER && (
                <textarea
                    rows={5}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Ваш ответ..."
                    value={props.data?.formAnswers?.[props.id]?.longAnswer}
                    onChange={(e) => {
                        props.setValue(props.id, {longAnswer: e.target.value})
                    }}
                />
            )}
        </div>
    )
}

export default StepFormElement;
