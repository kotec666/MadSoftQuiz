import Layout from "../../components/Layout"
import Container from "../../components/Container.tsx";
import {Link} from "react-router-dom";
import allQuestions from './../../mockQuestions.json'
import {getNoun} from "../../helpers/getNoun.ts";

const HomePage = () => {
    return (
        <Layout>
            <Container>
                <div className=" py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-bold mb-4">Список тестов</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {allQuestions.map((question) => (
                                <Link
                                    to={`tests/${question.id}`}
                                    key={question.id}
                                    className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                                >
                                    <div className="p-4">
                                        <h3 className="text-lg font-bold mb-2">{question.name}</h3>
                                        <p className="text-gray-600">Время выполнения: {getNoun(+question.timeToEnd, "минута", "минуты", "минут")}</p>
                                        <p className="text-gray-600">{question.description}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </Layout>
    )
}

export default HomePage