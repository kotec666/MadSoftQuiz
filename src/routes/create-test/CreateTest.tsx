// import Layout from "../../components/Layout.tsx";
// import Container from "../../components/Container.tsx";
// import {useFieldArray, useForm} from "react-hook-form";
// import {motion} from "framer-motion";
// import {useState} from "react";
// import {AnswerType} from "../../types/enums/test.ts";
//
//
// interface ICreateAnswer {
//     idx: number,
//     questionId: number,
//     answer: string
// }
//
// interface ICreateQuestion {
//     name: string
//     description: string
//     timeToEnd: string
//     questions: [
//         {
//             text: string
//             type: string
//             answers: [
//                 {
//                     answer: string
//                 },
//             ],
//             rightAnswer: number
//             rightAnswers: [],
//         },
//     ],
// }
//
// let idxCounter = 0;
//
// const CreateTest = () => {
//     const [data, setData] = useState({
//         answers: [
//             {answer: "", idx: idxCounter++, questionId: 0, isCorrect: false},
//         ]
//     })
//
//     const handleAddAnswer = (questionId: number) => {
//
//         return setData((s) => ({
//             ...s,
//             answers: [
//                 ...s.answers,
//                 {
//                     idx: idxCounter++,
//                     answer: "",
//                     questionId: questionId,
//                     isCorrect: false
//                 },
//             ],
//         }));
//     };
//
//     const handleRemoveAnswer = (answerData: ICreateAnswer) => {
//         return setData((s) => ({
//             ...s,
//             answers: s.answers.filter((answer) => {
//                 return answer.idx !== answerData.idx;
//             }),
//         }));
//     };
//
//
//     const handleChangeValue = (answer: ICreateAnswer, value: string, questionId: number) => {
//
//         return setData((s) => {
//             console.log(s.answers);
//             const foundedIdx = s.answers.findIndex((answ) => {
//                 return (answ.idx === answer.idx && Number(answ.questionId) === Number(questionId));
//             });
//
//             s.answers[foundedIdx].answer = value;
//
//             return {...s, answers: [...s.answers]};
//         });
//     };
//
//     const handleCorrectValue = (answer: ICreateAnswer, value: boolean) => {
//         return setData((s) => {
//             const foundedIdx = s.answers.findIndex((answ) => {
//                 return answ.idx === answer.idx;
//             });
//
//             s.answers[foundedIdx].isCorrect = value;
//
//             return {...s, answers: [...s.answers]};
//         });
//     };
//
//     const {
//         control,
//         handleSubmit,
//         register,
//         formState: {errors},
//     } = useForm({
//         mode: "onBlur",
//         reValidateMode: "onBlur",
//         defaultValues: {
//             name: "",
//             description: "",
//             timeToEnd: "",
//             questions: [],
//         },
//     });
//
//     const {fields, append, remove} = useFieldArray({
//         control,
//         name: "questions",
//     });
//
//
//     const onSubmit = (formData: ICreateQuestion) => {
//         console.log(formData);
//         console.log(data);
//
//         let idxs = [] as number[]
//
//         formData.questions.forEach((question) => {
//             question.answers = data.answers;
//         });
//
//         formData.questions.forEach((question) => {
//             const correctAnswers = data.answers.filter(answer => answer.isCorrect).map(answer => answer.idx);
//
//             if (correctAnswers.length === 1) {
//                 const foundedIdx = data.answers.findIndex((answ) => {
//                     return answ.idx === correctAnswers[0]
//                 })
//
//                 question.rightAnswer = foundedIdx;
//             } else {
//
//                 for (let i = 0; i <= data.answers.length - 1; i++) {
//                     if (data.answers[i].isCorrect) {
//                         idxs.push(i)
//                     }
//                 }
//
//                 question.rightAnswers = idxs;
//             }
//         })
//
//         const resultObj = formData.questions.map((question) => {
//             if (question.type === AnswerType.SINGLE_ANSWER) {
//                 return {
//                     ...question,
//                     answers: question.answers.map((answer, idx) => {
//                         return {
//                             id: idx,
//                             answer,
//                         }
//                     }),
//                     rightAnswer: question.rightAnswer,
//                 }
//             }
//
//             if (question.type === AnswerType.MULTI_ANSWER) {
//                 return {
//                     ...question,
//                     answers: question.answers.map((answer, idx) => {
//                         return {
//                             id: idx,
//                             answer,
//                         }
//                     }),
//                     rightAnswers: question.rightAnswers,
//                 }
//             }
//         })
//
//         console.log(resultObj)
//     };
//
//     return (
//         <Layout>
//             <Container>
//                 <div className="pt-[40px]">
//                     <h1 className="text-3xl font-bold text-gray-800 mb-4">
//                         Создание нового теста
//                     </h1>
//                     <form onSubmit={handleSubmit(onSubmit)}>
//                         <div className="mb-4">
//                             <label
//                                 htmlFor="name"
//                                 className="block text-gray-700 font-bold mb-2"
//                             >
//                                 Название теста
//                             </label>
//                             <input
//                                 type="text"
//                                 id="name"
//                                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                 {...register("name", {required: true})}
//                             />
//                             {errors.name && (
//                                 <p className="text-red-500 text-xs italic">
//                                     Это поле обязательно для заполнения.
//                                 </p>
//                             )}
//                         </div>
//                         <div className="mb-4">
//                             <label
//                                 htmlFor="description"
//                                 className="block text-gray-700 font-bold mb-2"
//                             >
//                                 Описание теста
//                             </label>
//                             <textarea
//                                 id="description"
//                                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                 {...register("description", {required: true})}
//                             />
//                             {errors.description && (
//                                 <p className="text-red-500 text-xs italic">
//                                     Это поле обязательно для заполнения.
//                                 </p>
//                             )}
//                         </div>
//                         <div className="mb-4">
//                             <label
//                                 htmlFor="timeToEnd"
//                                 className="block text-gray-700 font-bold mb-2"
//                             >
//                                 Время на прохождение (в минутах)
//                             </label>
//                             <input
//                                 type="number"
//                                 id="timeToEnd"
//                                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                 {...register("timeToEnd", {required: true, min: 1})}
//                             />
//                             {errors.timeToEnd && (
//                                 <p className="text-red-500 text-xs italic">
//                                     Время на прохождение должно быть больше 0 минут.
//                                 </p>
//                             )}
//                         </div>
//                         <div className="mb-4">
//                             <h2 className="text-2xl font-bold text-gray-800 mb-4">
//                                 Вопросы
//                             </h2>
//                             {fields.map((question, index) => (
//                                 <motion.div
//                                     key={question.id}
//                                     initial={{height: 0, opacity: 0}}
//                                     animate={{height: "auto", opacity: 1}}
//                                     exit={{height: 0, opacity: 0}}
//                                     transition={{duration: 0.3}}
//                                     className="bg-white shadow-md rounded-lg p-4 mb-4"
//                                 >
//                                     <div className="flex justify-end">
//                                         <button
//                                             type="button"
//                                             className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
//                                             onClick={() => remove(index)}
//                                         >
//                                             Удалить вопрос
//                                         </button>
//                                     </div>
//                                     <div className="mb-4">
//                                         <label
//                                             htmlFor={`questions.${index}.text`}
//                                             className="block text-gray-700 font-bold mb-2"
//                                         >
//                                             Текст вопроса
//                                         </label>
//                                         <input
//                                             type="text"
//                                             id={`questions.${index}.text`}
//                                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                             {...register(`questions.${index}.text`, {
//                                                 required: true,
//                                             })}
//                                         />
//                                         {errors.questions?.[index]?.text && (
//                                             <p className="text-red-500 text-xs italic">
//                                                 Это поле обязательно для заполнения.
//                                             </p>
//                                         )}
//                                     </div>
//                                     <div className="mb-4">
//                                         <label
//                                             htmlFor="type"
//                                             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                                         >
//                                             Тип ответа
//                                         </label>
//                                         <select
//                                             id="type"
//                                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                                             {...register(`questions.${index}.type`, {
//                                                 required: true,
//                                             })}
//                                         >
//                                             <option selected>Выберите тип ответа на вопрос</option>
//                                             <option value="SINGLE_ANSWER">Один ответ</option>
//                                             <option value="MULTI_ANSWER">Больше одного ответа</option>
//                                             <option value="SHORT_ANSWER">Краткий ответ</option>
//                                             <option value="LONG_ANSWER">Развернутый ответ</option>
//                                         </select>
//
//                                         {errors.questions?.[index]?.type && (
//                                             <p className="text-red-500 text-xs italic">
//                                                 Это поле обязательно для заполнения.
//                                             </p>
//                                         )}
//                                     </div>
//                                     <div className="mb-4">
//                                         <div className="my-[15px]">
//                                             <button
//                                                 type="button"
//                                                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                                                 onClick={() => {
//                                                     handleAddAnswer(index)
//                                                 }}
//                                             >
//                                                 Добавить ответ
//                                             </button>
//                                         </div>
//
//
//                                         <div className="flex flex-col items-center gap-y-[20px]">
//                                             {data.answers.map((answer, idx) => (
//                                                 <div className="flex gap-x-[10px] w-full" key={answer.idx}>
//                                                     <div className="flex flex-col gap-y-[5px] w-full">
//                                                         <label
//                                                             htmlFor="answers"
//                                                             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                                                         >
//                                                             Вариант ответа {idx + 1}
//                                                         </label>
//                                                         <input
//                                                             type="text"
//                                                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                                             placeholder="Вариант ответа"
//                                                             value={answer.answer}
//                                                             onChange={(e) => {
//                                                                 return handleChangeValue(answer, e.target.value, index);
//                                                             }}
//                                                         />
//                                                     </div>
//                                                     <div className="flex flex-col gap-y-[5px] w-full">
//                                                         <label
//                                                             htmlFor="answers"
//                                                             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                                                         >
//                                                             Вариант ответа {idx + 1} верный?
//                                                         </label>
//                                                         <select
//                                                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                                                             value={`${answer.isCorrect}`}
//                                                             onChange={(e) => {
//                                                                 return handleCorrectValue(answer, e.target.value === "true");
//                                                             }}
//                                                         >
//                                                             <option value="true">Да</option>
//                                                             <option value="false">Нет</option>
//                                                         </select>
//                                                     </div>
//                                                     <div className="flex items-end">
//                                                         <button
//                                                             type="button"
//                                                             className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2 w-full"
//                                                             onClick={() => handleRemoveAnswer(answer)}
//                                                         >
//                                                             -
//                                                         </button>
//                                                     </div>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </motion.div>
//                             ))}
//                             <div className="flex justify-end">
//                                 <button
//                                     type="button"
//                                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                                     onClick={() =>
//                                         append({
//                                             text: "",
//                                             type: "SINGLE_ANSWER",
//                                             answers: [
//                                                 {
//                                                     answer: "",
//                                                 },
//                                             ],
//                                             rightAnswer: 0,
//                                             rightAnswers: [],
//                                         })
//                                     }
//                                 >
//                                     +
//                                 </button>
//                             </div>
//                         </div>
//                         <div className="flex justify-end">
//                             <button
//                                 type="submit"
//                                 className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//                             >
//                                 Сохранить
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </Container>
//         </Layout>
//     )
//         ;
// };
//
// export default CreateTest;