import { SortOption } from '@/utils/sortUtils';

export const updateUrlParam = (
  searchParams: URLSearchParams,
  key: string,
  value: string,
): URLSearchParams => {
  const newParams = new URLSearchParams(searchParams.toString());

  newParams.set(key, value);

  return newParams;
};

export const getPerPageValue = (
  perPageParam: string | null,
  defaultPerPage: number,
): number => {
  const parsed = Number(perPageParam);

  return Number.isNaN(parsed) || parsed <= 0 ? defaultPerPage : parsed;
};

export const getSortOption = (sortParam: string | null): SortOption => {
  const allowedSorts: SortOption[] = ['price', 'title', 'age'];

  return allowedSorts.includes(sortParam as SortOption)
    ? (sortParam as SortOption)
    : 'age';
};
