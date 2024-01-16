import {ChangeEvent} from "react";

export type InputFieldPropsType = {
    type: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
};