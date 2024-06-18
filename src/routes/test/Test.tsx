import Layout from "../../components/Layout.tsx";
import Container from "../../components/Container.tsx";
import {useMultistepForm} from "../../hooks/useMultistepForm.ts";
import classNames from "classnames";
import StepFormElement from "./components/StepFormElement.tsx";
import {motion} from "framer-motion";
import {useParams, useNavigate, Navigate} from "react-router-dom";
import allQuestions from './../../mockQuestions.json'
import React, {ReactElement, useCallback, useEffect, useState} from "react";
import {IResultAnswer, ITest} from "../../types/interfaces/test.ts";
import {calculateResults} from "../../helpers/calculateResults.ts";
import TestAgain from "./components/TestAgain.tsx";
import {debounce} from "../../helpers/debounce.ts";


const TimerBlock = ({initialTime, testId}: { initialTime: number, testId: string }) => {
    if (isNaN(initialTime)) {
        return null;
    }

    /**
     *
     * блок с таймером сверху
     *
     * */

    const [data, setData] = useState({
        timeToEnd: initialTime,
    });

    const navigate = useNavigate();

    useEffect(() => {
        const timeEndInterval = setInterval(() => {

            setData((s) => {
                const savedAnswers = JSON.parse(localStorage.getItem(`form-answers-test-${testId}`) || '{}') // сохранение текущего времени до конца теста
                localStorage.setItem(`form-answers-test-${testId}`, JSON.stringify({...savedAnswers, savedTimeToEnd: s.timeToEnd - 1}))
                return ({...s, timeToEnd: s.timeToEnd - 1})
            })
        }, 1000);

        return () => clearInterval(timeEndInterval);
    }, []);

    useEffect(() => {
        if (data.timeToEnd === 0) {
            return navigate(`/test-failed-timed-out/${testId}`); // если тест завершился по истечению времени - перекидывает на страницу фейла
        }
    }, [data.timeToEnd, testId]);

    return (
        <div className="my-[14px]">
            <p className="text-2xl font-semibold text-gray-800">
                <span>Оставшееся время: </span>
                <span>
                    {new Date(data.timeToEnd * 1000).toISOString().substring(11, 19)}
                </span>
            </p>
        </div>
    );
};

const Test = () => {
    const {testId} = useParams();

    const defaultFormAnswers = JSON.parse(localStorage.getItem(`form-answers-test-${testId}`) || '{}') // для получения данных после перезагрузки страницы

    const [data, setData] = useState<{
        currentTest: ITest
        formAnswers: Record<string, IResultAnswer>
    }>({
        currentTest: {} as ITest,
        formAnswers: defaultFormAnswers
    });


    const navigate = useNavigate();

    const setValue = <T, >(name: string | number, value: T) => { // установка значения ответов
        return setData((s) => {
            handleSaveDataToLSDebounced({...s.formAnswers, [name]: value, currentStep: currentStepIndex}); // сохранение данных в локальном хранилище
            return ({...s, formAnswers: {...s.formAnswers, [name]: value} as Record<string, IResultAnswer>})
        })
    }

    let stepsElements = [] as ReactElement[]

    const resultsExist = localStorage.getItem(`test-${testId}`)

    if (resultsExist !== null) {
        return <TestAgain navigate={navigate} testId={testId}/> // если тест уже был пройден перекидывает на страницу прохождения заново
    }

    if (Array.isArray(allQuestions) && typeof testId === 'string') {
        const foundedElements = allQuestions?.find(question => question?.id === parseInt(testId))

        if (!foundedElements) {
            return <Navigate to="/"/>
        }

        // преобразование вопросов в массив реакт компонентов
        stepsElements = foundedElements?.questions?.map((question) => (
            <StepFormElement
                data={data}
                setValue={setValue}
                {...question}
            />
        ));
    }


    useEffect(() => {

        // если айдишник теста это валидное число - проход дальше
        if (typeof testId === 'string' && !isNaN(Number(testId))) {
            let foundedTest = allQuestions.find(question => question.id === parseInt(testId))

            if (!foundedTest) { // если теста не существует - возврат на главную
                return navigate("/")
            }


            // если все корректно - тест запускается
            setData((s) => ({
                    ...s,
                    timeToEnd: parseInt(foundedTest.timeToEnd) * 60,
                    currentTest: foundedTest,
                }
            ));
        } else {
            return navigate("/")
        }

    }, [])

    const {
        steps,
        currentStepIndex,
        step,
        isFirstStep,
        isLastStep,
        back,
        next,
        goTo,
    } = useMultistepForm(stepsElements);


    useEffect(() => {
        const isFormAnswersExist = localStorage.getItem(`form-answers-test-${testId}`)

        // если сохраненные ответы есть - перебросит на тот же шаг формы
        if (isFormAnswersExist !== null) {
            const {currentStep} = JSON.parse(localStorage.getItem(`form-answers-test-${testId}`) || '{}')
            if(currentStep){
                return goTo(currentStep)
            }
        }
    }, [])


    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isLastStep) return next();

        if (currentStepIndex + 1 === steps.length) {
            // на последнем шаге происходит сохранение результатов в LS и переход на новую страницу
            localStorage.setItem(`test-${testId}`, JSON.stringify(calculateResults(data.formAnswers, data.currentTest.questions)))
            return navigate(`/test-finished/${testId}`);
        }
    }

    const saveDataToLS = (formAnswers: Record<string, IResultAnswer>) => {
        localStorage.setItem(`form-answers-test-${testId}`, JSON.stringify(formAnswers))
    }

    const handleSaveDataToLSDebounced = useCallback(
        debounce(saveDataToLS, 500),
        [],
    )


    return (
        <Layout>
            <Container>
                <form onSubmit={onSubmit}>
                    {data.currentTest && (
                        <TimerBlock initialTime={defaultFormAnswers.savedTimeToEnd || parseInt(data.currentTest.timeToEnd) * 60} testId={`${testId}`}/>)}
                    <div className="bg-gray-100 py-8">
                        <div className="">
                            <div className="bg-white shadow-md rounded-lg p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span
                                        className="text-gray-600">Вопрос {currentStepIndex + 1} из {steps.length}</span>
                                    <span
                                        className="text-gray-600">{Math.round((currentStepIndex + 1) / steps.length * 100)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-4">
                                    <motion.div
                                        className="bg-blue-600 h-4 rounded-full"
                                        initial={{width: `${Math.round((0) / steps.length * 100)}%`}}
                                        animate={{width: `${Math.round((currentStepIndex + 1) / steps.length * 100)}%`}}
                                        transition={{duration: 0.5}}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-12 pb-12">
                        {step}
                    </div>
                    <div
                        className={classNames(
                            "flex items-center border-t-[1px] border-b-line-grey pt-[40px]",
                            {
                                "justify-between gap-[15px]": !isFirstStep,
                                "justify-end": isFirstStep,
                            },
                        )}
                    >
                        {!isFirstStep && (
                            <motion.div
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                                transition={{duration: 0.5}}
                            >
                                <button
                                    onClick={back}
                                    type="button"
                                    className="bg-blue-600 px-[14px] py-[7px] rounded-[6px] text-white cursor-pointer xlmaxw:bg-grey xlmaxw:w-[80px] xlmaxw:h-[40px] flex justify-center items-center"
                                >
                                    Назад
                                </button>
                            </motion.div>
                        )}
                        <button
                            type="submit"
                            className="bg-blue-600 px-[14px] py-[7px] rounded-[6px] text-white"
                        >
                            Ответить
                        </button>
                    </div>
                </form>
            </Container>
        </Layout>
    )
}

export default Test