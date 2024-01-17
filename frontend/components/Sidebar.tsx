import React from "react";

const Sidebar : React.FC = () => {
    return (
        <aside className="col-span-2 bg-gray-300 p-4 min-h-screen">
            <nav>
                <ul>
                    <li>Create Assessment</li>
                    <li>Assessment Listing</li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
