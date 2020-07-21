export class BaseFilter {
    limit: number = 10;
    page: number = 0;
    ordering: string;
    active: boolean;
    is_active: boolean;
    fields: string;
}