import React from "react";
import {Table} from "@/components/Table";

interface Assessment {
    sections: {
        questions: {
            id: number;
            name: string;
            options: {
                option: string;
                isCorrect: boolean;
            }[];
        }[];
    }[];
}

interface AssessmentTableProps {
    assessment: Assessment;
}

const AssessmentTable: React.FC<AssessmentTableProps> = ({ assessment }) => {
    const headers: string[] = ["ID", "Question", "Option 1", "Option 2", "Option 3", "Option 4", "Correct Answers"];

    const transformedData: Record<string, React.ReactNode>[] = assessment.sections.reduce((acc: Record<string, React.ReactNode>[], section) => {
        section.questions.forEach((question, index) => {
            const rowData: Record<string, React.ReactNode> = {
                ID: question.id, // Use question ID instead of index
                Question: question.name,
                "Option 1": question.options[0]?.option,
                "Option 2": question.options[1]?.option,
                "Option 3": question.options[2]?.option,
                "Option 4": question.options[3]?.option,
                "Correct Answers": question.options
                    .filter((option) => option.isCorrect)
                    .map((option) => option.option)
                    .join(", ")
            };
            acc.push(rowData);
        });
        return acc;
    }, []);


    return <Table headers={headers} data={transformedData} />;
};

export default AssessmentTable;