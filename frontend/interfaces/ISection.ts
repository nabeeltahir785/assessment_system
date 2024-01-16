export interface ISection {
    status: string;
    message: string;
    data: Array<{
        id: number;
        title: string;
        description: string;
        created_at: string;
        updated_at: string;
    }>;
}
