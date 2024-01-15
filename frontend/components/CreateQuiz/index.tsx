
    import React, { useState } from 'react';

    const defaultQuestion = { question: '', options: ['', ''], answer: '', type: 'MCQ' };

    const QuizForm = () => {
        const [questions, setQuestions] = useState([defaultQuestion]);

        const handleQuestionChange = (value, index) => {
            const updatedQuestions = [...questions];
            updatedQuestions[index] = { ...updatedQuestions[index], ...value };
            setQuestions(updatedQuestions);
        };

        const addOption = (index) => {
            const updatedQuestions = [...questions];
            updatedQuestions[index].options.push('');
            setQuestions(updatedQuestions);
        };

        const handleOptionChange = (value, questionIndex, optionIndex) => {
            const updatedQuestions = [...questions];
            updatedQuestions[questionIndex].options[optionIndex] = value;
            setQuestions(updatedQuestions);
        };

        const addQuestion = () => {
            setQuestions([...questions, { ...defaultQuestion }]);
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            console.log('Quiz Data:', questions);
        };

        return (
            <form onSubmit={handleSubmit} className="space-y-6">
                {questions.map((q, qIndex) => (
                    <div key={qIndex} className="border p-4 rounded">
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Question {qIndex + 1}</label>
                            <input
                                type="text"
                                className="w-full border-gray-300 rounded shadow-sm"
                                value={q.question}
                                onChange={(e) => handleQuestionChange({ question: e.target.value }, qIndex)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Type</label>
                            <select
                                className="w-full border-gray-300 rounded shadow-sm"
                                value={q.type}
                                onChange={(e) => handleQuestionChange({ type: e.target.value }, qIndex)}
                            >
                                <option value="MCQ">Multiple Choice</option>
                                <option value="MSQ">Multiple Select</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Options</label>
                            {q.options.map((option, oIndex) => (
                                <div key={oIndex} className="flex items-center mb-2">
                                    <input
                                        type="text"
                                        className="w-full border-gray-300 rounded shadow-sm mr-2"
                                        value={option}
                                        onChange={(e) => handleOptionChange(e.target.value, qIndex, oIndex)}
                                    />
                                    {q.type === 'MCQ' ? (
                                        <input
                                            type="radio"
                                            name={`answer-${qIndex}`}
                                            onChange={() => handleQuestionChange({ answer: oIndex.toString() }, qIndex)}
                                            checked={q.answer === oIndex.toString()}
                                        />
                                    ) : (
                                        <input
                                            type="checkbox"
                                            onChange={() => {
                                                const newAnswer = q.answer.split(',').includes(oIndex.toString())
                                                    ? q.answer.split(',').filter(a => a !== oIndex.toString()).join(',')
                                                    : q.answer ? q.answer + ',' + oIndex : oIndex.toString();
                                                handleQuestionChange({ answer: newAnswer }, qIndex);
                                            }}
                                            checked={q.answer.split(',').includes(oIndex.toString())}
                                        />
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                className="text-sm text-blue-500"
                                onClick={() => addOption(qIndex)}
                            >
                                Add Option
                            </button>
                        </div>
                    </div>
                ))}
                <div className="text-right">
                    <button
                        type="button"
                        className="mr-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        onClick={addQuestion}
                    >
                        Add Question
                    </button>
                    <button
                        type="submit"
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                    >
                        Submit Quiz
                    </button>
                </div>
            </form>
        );
    };

    export default QuizForm;