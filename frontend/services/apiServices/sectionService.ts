import { apiManager } from "../api-manager/apiManager";
import {ISection} from "@/interfaces/ISection";

export const getSectionList = async (): Promise<ISection[]> => {
    const url =   `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`
    const { data } = await apiManager.request(url, {}, "GET");
    return data;
};