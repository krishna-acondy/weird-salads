import React from "react";
import { PageInfo } from "../types";

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

export interface PageVariables {
  first: number;
  last: number;
  before: string;
  after: string;
  offset: number;
}

export interface PaginationHookOptions {
  pageSize: number;
  strategy?: "cursor" | "offset";
}

export interface PaginationHookReturnValue {
  state: PaginationState;
  pageVariables: Partial<PageVariables>;
  setPageIndex: (pageIndex: number) => void;
  setPageSize: (pageSize: number) => void;
  nextPage: (cursor?: string) => void;
  previousPage: (cursor?: string) => void;
  resetPageIndex: () => void;
  onPaginationChange: (pageInfo?: PageInfo) => OnChangeFn<PaginationState>;
}

export type Updater<T> = T | ((old: T) => T);
export type OnChangeFn<T> = (updaterOrValue: Updater<T>) => void;

export function usePagination(options: PaginationHookOptions) {
  const { pageSize: initialPageSize, strategy = "cursor" } = options;

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  });

  const initialOffset = strategy === "offset" ? 0 : undefined;

  const [pageVariables, setPageVariables] = React.useState<
    Partial<PageVariables>
  >({
    first: initialPageSize,
    offset: initialOffset,
  });

  const getOffset = (pageIndex: number) => {
    return strategy === "offset" ? pagination.pageSize * pageIndex : undefined;
  };

  const setPageIndex = (pageIndex: number) => {
    setPagination((prev) => ({
      ...prev,
      pageIndex,
    }));

    // Reset cursors when page index is reset.
    if (pageIndex === 0) {
      setPageVariables({
        first: pagination.pageSize,
        last: undefined,
        before: undefined,
        after: undefined,
        offset: getOffset(0),
      });
    }

    if (strategy === "offset") {
      setPageVariables((prev) => ({
        ...prev,
        offset: getOffset(pageIndex),
      }));
    }
  };

  const resetPageIndex = () => {
    setPageIndex(0);
  };

  const setPageSize = (pageSize: number) => {
    setPagination({
      pageIndex: 0,
      pageSize,
    });
    setPageVariables({
      first: pageSize,
    });
  };

  const nextPage = (cursor?: string) => {
    const pageIndex = pagination.pageIndex + 1;

    setPageIndex(pageIndex);

    if (strategy === "cursor") {
      setPageVariables({
        first: pagination.pageSize,
        after: cursor,
      });
    }
  };

  const previousPage = (cursor?: string) => {
    const pageIndex = pagination.pageIndex - 1;

    setPageIndex(pageIndex);

    if (strategy === "cursor") {
      setPageVariables({
        last: pagination.pageSize,
        before: cursor,
      });
    }
  };

  // Takes a cursor and returns an updater function that can be used to change
  // the pagination state.
  const onPaginationChange =
    (pageInfo?: PageInfo): OnChangeFn<PaginationState> =>
    (updater) => {
      const { pageIndex, pageSize } =
        updater instanceof Function ? updater(pagination) : updater;

      setPagination({
        pageIndex,
        pageSize,
      });

      if (pageSize !== pagination.pageSize) {
        setPageSize(pageSize);
      }

      if (!pageInfo) return;

      if (pageIndex === pagination.pageIndex + 1) {
        nextPage(pageInfo.endCursor);
      } else if (pageIndex === pagination.pageIndex - 1) {
        previousPage(pageInfo.startCursor);
      }
    };

  return {
    state: pagination,
    pageVariables,
    setPageIndex,
    setPageSize,
    nextPage,
    previousPage,
    resetPageIndex,
    onPaginationChange,
  };
}
