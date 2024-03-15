export type PageInfo = { __typename: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }

export class ResultData<T>{
    pageInfo: PageInfo;
    data: T;
    totalCount: number;
    /**
     *
     */
    constructor(data: T, pageInfo: PageInfo, totalCount: number) {
        this.data = data;
        this.pageInfo = pageInfo;
        this.totalCount = totalCount;
    }
}