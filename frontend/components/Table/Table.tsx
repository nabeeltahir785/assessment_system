import React from "react";
import TableHeader from "@/components/Table/TableHeader";
import TableBody from "@/components/Table/TableBody";

interface TableProps {
    headers: string[];
    data: { [key: string]: any }[];
}

const Table: React.FC<TableProps> = ({ headers, data }) => {
    return (
        <table>
            <TableHeader headers={headers}/>
            <TableBody headers={headers} data={data}/>
        </table>
    );
};

export default Table;
