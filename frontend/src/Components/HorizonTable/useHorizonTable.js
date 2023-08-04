import { useTable, useSortBy, usePagination } from "react-table";

export const useHorizonTable = tableOptions => {
  return useTable(tableOptions, useSortBy, usePagination);
};
