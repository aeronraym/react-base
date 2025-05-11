export type ResultErrors = string[];

export interface Result<T> extends UnitResult {
  data: T;
}

export interface PaginatedResult<T> extends UnitResult {
  pageNumber: number;
  itemsPerPage: number;
  resultsCount: number;
  totalResultsCount: number;
  totalPages: number;
  data: T[];
}

export interface UnitResult {
  successful: boolean;
  errors: ResultErrors;
}


export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}