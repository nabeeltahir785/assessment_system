import React from "react";
import Link from "next/link";
const Sidebar : React.FC = () => {
    return (
        <aside className="col-span-2 bg-slate-200 p-4 min-h-screen">
            <nav>
                <ul>
                    <li className="pb-4"><Link href="/admin/assessment/create">Create Assessment</Link></li>
                    <li className="pb-4"><Link href="/admin/assessment/manage">Assessment Attempt</Link></li>
                    <li className="pb-4"><Link href="/student/quizzes/">Quiz Lists</Link></li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
