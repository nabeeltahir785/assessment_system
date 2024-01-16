import React from "react";

const AssessmentForm: React.FC = () => {

    return (
        <form>
            <input type="text" placeholder="Assessment Title" />
            <textarea placeholder="Description"></textarea>

            {/* Add Section Dropdown */}
            <SectionDropdown />

            {/* Dynamically add questions based on section */}
            {/* This can be an array of QuestionForms */}

            <button type="submit">Submit</button>
        </form>
    );
};

export default AssessmentForm;