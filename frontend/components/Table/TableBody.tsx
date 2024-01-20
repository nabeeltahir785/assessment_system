import React from "react";

interface TableProps {
    headers: string[];
    data: { [key: string]: any }[];
}
const TableBody: React.FC<TableProps> = ({ headers, data }) => {
    return (
        <tbody>
        {data.map((row, index) => (
            <tr key={index}>
                {headers.map(header => (
                    <td className="px-6 py-4 whitespace-nowrap" key={`${index}-${header}`}>{row[header]}</td>
                ))}
            </tr>
        ))}
        </tbody>
    );
}

export default TableBody;