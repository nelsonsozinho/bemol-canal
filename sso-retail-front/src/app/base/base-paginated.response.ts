export class BasePaginatedResponse<T> {
    public count: number = 0;
    public next: number;
    public previous: number;
    public results: Array<T>;
}