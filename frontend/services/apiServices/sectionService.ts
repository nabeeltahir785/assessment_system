import { apiManager } from "../api-manager/apiManager";
import {ISection} from "@/interfaces/ISection";

export const getSectionList = async (): Promise<ISection[]> => {
    // We now route through the Next.js internal proxy API to automatically inject HttpOnly cookies
    const url =   `/api/sections`;
    const { data } = await apiManager.request(url, {}, "GET");
    return data;
};