import Layout from "../../../components/Layout.tsx";
import Container from "../../../components/Container.tsx";


interface IProps {
    testId: string | undefined;
    navigate: (path: string) => void;
}

const TestAgain = (props: IProps) => {

    return (
        <Layout>
            <Container className="flex flex-col justify-center h-screen">
                <div className="flex flex-col justify-center items-center gap-y-[40px]">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        Хотите пройти тест еще раз?
                    </h1>
                    <div className="flex justify-center items-center gap-x-[20px]">
                        <div className="flex justify-center">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                type="button"
                                onClick={() => {
                                    localStorage.removeItem(`test-${props.testId}`)
                                    localStorage.removeItem(`form-answers-test-${props.testId}`)
                                    window.location.reload()
                                }}
                            >
                                Пройти тест
                            </button>
                        </div>
                        <div className="flex justify-center">
                            <button
                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                                type="button"
                                onClick={() => {
                                    props.navigate("/");
                                }}
                            >
                                Вернуться
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </Layout>
    );
};

export default TestAgain;