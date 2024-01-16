import React, {useEffect, useState} from "react"
import {ISection} from "@/interfaces/ISection";
import {getSectionList} from "@/services/apiServices/sectionService";
import Dropdown from "@/components/Form/Dropdown";

const SectionDropdown : React.FC = () => {
    const [sections, setSections] = useState<ISection[] | []>([]);
    const handleSelect = (value: string) => {
        console.log(`Selected: ${value}`);
    }
    useEffect(() => {
        const fetchSectionList = async () => {
            const response = await getSectionList();
            setSections(response.data);
        };
        fetchSectionList();
    },[])
    return (
        <Dropdown options={sections} onSelect={handleSelect} />
    )
}

export default SectionDropdown;