import {IUser} from "@/interfaces/IUser";

export interface ILoginSuccessResponse {
    status: 'success';
    message: string;
    data: {
        user: IUser;
        token: string;
    };
}