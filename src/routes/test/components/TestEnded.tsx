import Layout from "../../../components/Layout.tsx";
import Container from "../../../components/Container.tsx";
import {motion} from "framer-motion";
import {Link, useParams} from "react-router-dom";
import {TestStatus} from "../../../types/enums/test.ts";
import classNames from "classnames";


interface ITestEndedProps {
    reason: TestStatus
}

const TestEnded = (props: ITestEndedProps) => {
    const {testId} = useParams();

    const {
        correct,
        incorrect
    } = JSON.parse(localStorage.getItem(`test-${testId}`) || "{ \"correct\":  0, \"incorrect\":  0 }");

    return (
        <Layout>
            <Container>
                <div className="flex flex-col items-center justify-center h-screen">
                    <motion.div
                        initial={{opacity: 0, scale: 0.8}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{duration: 0.5}}
                        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
                    >
                        <div className="text-center">
                            {props.reason === TestStatus.TIMED_OUT && (
                                <div>
                                    <h2 className="text-3xl font-bold text-red-500 mb-4">
                                        Время теста истекло
                                    </h2>
                                    <p className="text-gray-600 mb-6">
                                        Извините, но время, отведенное на прохождение теста, истекло.
                                    </p>
                                </div>
                            )}
                            {props.reason === TestStatus.TEST_SUCCESS && (
                                <div>
                                    <h2 className="text-3xl font-bold text-green-500 mb-4">
                                        Вы прошли тест!
                                    </h2>
                                    <div className="md:px-[50px]">
                                        <p className="text-gray-600 mb-6">
                                            Количество <span className="text-green-500">правильных</span> ответов в
                                            тестовой части - <span className={classNames('', {
                                            "text-green-500": correct > 0,
                                            "text-red-500": correct === 0
                                        })}>{correct}</span>
                                        </p>
                                        <p className="text-gray-600 mb-6">
                                            Количество <span className="text-red-500">неправильных</span> ответов в
                                            тестовой части - <span className={classNames('', {
                                            "text-green-500": incorrect === 0,
                                            "text-red-500": incorrect > 0
                                        })}>{incorrect}</span>
                                        </p>
                                    </div>
                                </div>
                            )}
                            <Link
                                to="/"
                            >
                                <div
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                                    <span>Вернуться на главную</span>
                                </div>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </Layout>
    );
};

export default TestEnded;