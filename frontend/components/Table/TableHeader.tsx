import React from "react";

interface TableProps {
    headers: string[];
}
const TableHeader: React.FC<TableProps> = ({ headers}) => {
    return (
            <thead>
            <tr>
                {headers.map(header => (
                    <th key={header}>{header}</th>
                ))}
            </tr>
            </thead>
    );
}

export default TableHeader;