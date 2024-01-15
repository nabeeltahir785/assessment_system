import React from "react";

const Sidebar : React.FC = () => {
    return (
        <aside className="bg-blue-200 w-64 p-4">
            <nav>
                <ul>
                    <li>Sidebar Item 1</li>
                    <li>Sidebar Item 2</li>
                    <!-- Add more sidebar items here -->
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
