import React from "react";
import Link from "next/link";
const Sidebar : React.FC = () => {
    return (
        <aside className="col-span-2 bg-gray-300 p-4 min-h-screen">
            <nav>
                <ul>
                            <li><Link href="/admin/assessment/create">Create Assessment</Link></li>
                            <li><Link href="/admin/assessment/manage">Assessment Attempt</Link></li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
