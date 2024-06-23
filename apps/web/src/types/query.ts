// TODO: Decide what filters are unnecessary and can be removed.
export type BaseFilter<T> = {
  isNull?: boolean;
  equalTo?: T;
  notEqualTo?: T;
  TistinctFrom?: T;
  notTistinctFrom?: T;
  in?: T[];
  notIn?: T[];
  lessThan?: T;
  lessThanOrEqualTo?: T;
  greaterThan?: T;
  greaterThanOrEqualTo?: T;
};

export type DateFilter = BaseFilter<Date>;

export type NumberFilter = BaseFilter<number>;

export type StringFilter = BaseFilter<string> & {
  includes?: string;
  notInclues?: string;
  includesInsensitive?: string;
  notIncludesInsensitive?: string;
  startsWith?: string;
  notStartsWith?: string;
  startsWithInsensitive?: string;
  endsWith?: string;
  notEndsWith?: string;
  endsWithInsensitive?: string;
  notEndsWithInsensitive?: string;
  like?: string;
  notLike?: string;
  likeInsensitive?: string;
  notLikeInsensitive?: string;
  equalToInsensitive?: string;
  notEqualToInsensitive?: string;
  distinctFromInsensitive?: string;
  notDistinctFromInsensitive?: string;
  inInsensitive?: string;
  notInInsensitive?: string;
  lessThanInsensitive?: string;
  lessThanOrEqualToInsensitive?: string;
  greaterThanInsensitive?: string;
  greaterThanOrEqualToInsensitive?: string;
};

export type StringListFilter = BaseFilter<string[]> & {
  contains?: string[];
  containedBy?: string[];
  overlaps?: string[];
  anyEqualTo?: string;
  anyLessThan?: string;
  anyLessThanOrEqualTo?: string;
  anyGreaterThan?: string;
  anyGreaterThanOrEqualTo?: string;
};

export type Filter<T> = {
  [P in keyof T]?: DateFilter | NumberFilter | StringFilter | StringListFilter;
};

export type ConditionFilter<T> = {
  and?: [Filter<T>];
  or?: [Filter<T>];
  not?: Filter<T>;
};

export type FilterVariables<T> = Filter<T> & ConditionFilter<T>;

export type ConnectionVariables<TData> = {
  first?: number;
  last?: number;
  offset?: number;
  after?: string;
  before?: string;
  orderBy?: string[];
  filter?: Filter<TData> & ConditionFilter<TData>;
};

export type Edge<TData> = {
  cursor: string;
  node: TData;
};

export type PageInfo = {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type Connection<TData> = {
  nodes: TData[];
  edges: Edge<TData>[];
  pageInfo: PageInfo;
  totalCount: number;
};
