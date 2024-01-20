export interface IDropdownOption {
    id: number;
    label: string;
}

const dropdownOptions: IDropdownOption[] = [
    { id: 0, label: 'Math' },
    { id: 1, label: 'Physics' },
    { id: 2, label: 'Arabic' },
    { id: 3, label: 'Urdu' }
];

export default dropdownOptions;
