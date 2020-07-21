export class PageWrapper<T> {
    public count: number;
    public next: number;
    public previous: number;
    public results: Array<T>;

    nextPage(page: number): number {
        return page == undefined ? 2 : page + 1;
    }

    previusPage(page: number): number {
        if(page == undefined) {
            return 1
        } else if(page <= 0 || page == 1) {
            return 1;
        }

        return page - 1
    }
 }
