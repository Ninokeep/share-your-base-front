export interface Pagination {
  page: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemCount: number;
  pageCount: number;
  take: number;
}
