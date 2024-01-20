import {IDropdownOption} from "@/components/assessments/create/DropdownOptions";

export interface IDropdown {
    dropdownOptions: IDropdownOption[];
    currentSectionId: IDropdownOption;
    onSectionChange: (selectedValue: IDropdownOption) => void;
}