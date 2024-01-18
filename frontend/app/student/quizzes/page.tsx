import React from "react";
import Dashboard from "@/components/Dashboard";
import Link from "next/link";
interface Quiz {
    id: number;
    title: string;
    description?: string;
}
type QuizList = Quiz[];


export default function QuizList() {
    const quizzes: QuizList = [
        { id: 1, title: 'First Quiz' },
        { id: 2, title: 'Second Quiz' },
    ];
    return (
        <Dashboard>
            <h1>Quiz List</h1>
            <ul>
                {quizzes.map((quiz) => (
                    <li key={quiz.id}>
                        <Link href={`/student/quizzes/${quiz.id}`}>
                            {quiz.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </Dashboard>
    );
}