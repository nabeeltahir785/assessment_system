import React, {useState} from "react";
import {IQuestion} from "@/interfaces/IQuestion";
import Input from "@/components/Form/Input";
const QuestionForm: React.FC = =() => {
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const addQuestion = () => {
        setQuestions([...questions, { question: '', options: [], answer: '', type: 'MCQ' }]);
    };

    const updateQuestion = (index: number, question: IQuestion) => {
        const newQuestions = [...questions];
        newQuestions[index] = question;
        setQuestions(newQuestions);
    };

    const removeQuestion = (index: number) => {
        const newQuestions = [...questions];
        newQuestions.splice(index, 1);
        setQuestions(newQuestions);
    };

    return (
        <>

            {questions.map((q, index) => (
                <div key={index}>
                    <Input
                        type="text"
                        placeholder="Question"
                        value={q.question}
                        onChange={(e) => updateQuestion(index, { ...q, question: e.target.value })}
                    />
                    {q.options.map((option, optionIndex) => (
                        <div key={optionIndex}>
                            <input
                                type="text"
                                placeholder="Option"
                                value={option.text}
                                onChange={(e) =>
                                    updateQuestion(index, {
                                        ...q,
                                        options: q.options.map((opt, optIndex) =>
                                            optIndex === optionIndex
                                                ? { ...opt, text: e.target.value }
                                                : opt
                                        ),
                                    })
                                }
                            />
                            <Input
                                type="checkbox"
                                checked={option.isCorrect}
                                onChange={(e) =>
                                    updateQuestion(index, {
                                        ...q,
                                        options: q.options.map((opt, optIndex) =>
                                            optIndex === optionIndex
                                                ? { ...opt, isCorrect: e.target.checked }
                                                : opt
                                        ),
                                    })
                                }
                            />
                            <button
                                type="button"
                                onClick={() => removeQuestion(index)}
                            >
                                Remove Question
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={() => removeQuestion(index)}>
                        Remove Question
                    </button>
                </div>
            ))}
            <button type="button" onClick={addQuestion}>
                Add Question
            </button>

        </>
    )
};

export default QuestionForm;