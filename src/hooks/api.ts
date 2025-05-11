/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Query, useMutation, UseMutationOptions, useQuery } from "@tanstack/react-query";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

/**
 * Utility function to construct the full API URL.
 */
const buildApiUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`;

/**
 * Generic Fetch Function for API requests.
 */
const callApi = async <T>(endpoint: string, method: string = "GET", body?: any): Promise<T> => {
  const response = await fetch(buildApiUrl(endpoint), {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw await response.json();
  }

  return response.json();
};

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

/**
 * Fetches a single item from an API.
 * @param resource API endpoint (e.g., "/Users").
 * @param id Resource ID.
 */
export const useFetchQuery = <T>(url: string  | null) => {
  return useQuery<T>({
    queryKey: [url],
    queryFn: () => callApi<T>(`${url}`),
    staleTime: 0,
  });
};

export interface QueryObject {
  key: string
  value: string | number | boolean
}
/**
 * Fetches paginated data.
 * @param endpoint API endpoint (e.g., "/Users").
 * @param initialPageSize Default page size.
 */
export const usePaginatedQuery = <T>(endpoint: string, otherArgs:QueryObject[] = []) => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  let otherArgsString = "" ;
  let queryString = `${endpoint}?page=${page}&pageSize=${pageSize}`;

  if (otherArgs) {
      otherArgsString = Object.entries(otherArgs)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
  }

  queryString = otherArgsString ? `&${otherArgsString}` : queryString;

  console.log("Query String from pagination hook: ", queryString);

  const { data, isLoading, isError } = useQuery<PaginatedResponse<T>>({
    queryKey: [endpoint, page, pageSize, otherArgsString],
    queryFn: () => callApi<PaginatedResponse<T>>(queryString),
    placeholderData: (prevData) => prevData, // Keep previous data
  });

  return {
    data: data ?? { data: [], page: 1, pageSize, totalCount: 0, totalPages: 1 },
    isLoading,
    isError,
    page,
    setPage,
  };
};

/**
 * API mutation hook for performing POST, PUT, or DELETE requests.
 * @param endpoint API endpoint (e.g., "/Users").
 * @param method HTTP method ("POST", "PUT", "DELETE").
 */

export interface ErrorResponse {
    errors: string[];
    status:number;
    title: string;
}
export const useApiMutation = <TResponse, TRequest>(
  endpoint: string,
  method: "POST" | "PUT" | "DELETE",
  options?: UseMutationOptions<TResponse, ErrorResponse, TRequest>
) => {
  return useMutation<TResponse, ErrorResponse, TRequest>({
    mutationFn: (body: TRequest) => callApi<TResponse>(endpoint, method, body),
    ...options,
  });
};


