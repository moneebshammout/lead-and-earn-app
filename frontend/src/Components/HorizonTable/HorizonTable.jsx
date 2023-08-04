/* eslint-disable react/jsx-key */
import  { useState, useEffect, useRef } from "react";
import { useTable, useSortBy, usePagination } from "react-table";

import {
  Paper,
  Table,
  TableHead,
  TableBody,
  CircularProgress
} from "@material-ui/core";
import { StyledTableCell, StyledTableRow } from "./HorizonTableStyles";
import TableFilter from "react-table-filter";
import { HorizonPaginator } from "./HorizonPaginator";
import { Overlay } from "./Overlay";
import { HorizonEmptyBody } from "./HorizonEmptyBody";
export const HorizonTable = props => {
  // Use the state and functions returned from useTable to build your UI

  const [filteredData, setFilteredData] = useState([]);
  const filterRef = useRef(null);
  const table = useTable(
    {
      columns: props.columns,
      data: filteredData
    },
    useSortBy,
    usePagination
  );
  useEffect(() => {
    filterRef.current.reset(props.data, true);
    setFilteredData(props.data);
  }, [props.data]);
  // Render the UI for your table
  const updateFilterHandler = newData => {
    setFilteredData(newData);
  };
  return (
    <Paper style={{ position: "relative" }}>
      <div style={{ position: "relative" }}>
        <Table {...table.getTableProps()}>
          <TableHead>
            {table.headerGroups.map(headerGroup => (
              <TableFilter
                {...headerGroup.getHeaderGroupProps()}
                style={{ color: "black" }}
                rows={props.data}
                onFilterUpdate={updateFilterHandler}
                ref={filterRef}
              >
                {headerGroup.headers.map(column => {
                  return (
                    <StyledTableCell
                      {...column.getHeaderProps()}
                      style={{
                        width: 100,
                        color: "black"
                      }}
                      filterkey={column.id}
                    >
                      {column.render("Header")}
                    </StyledTableCell>
                  );
                })}
              </TableFilter>
            ))}
          </TableHead>
          {props.data.length > 0 && (
            <TableBody>
              {(props.enablePagination === true ? table.page : table.rows).map(
                row =>
                  table.prepareRow(row) || (
                    <StyledTableRow
                      id={row.getRowProps().key}
                      {...row.getRowProps()}
                    >
                      {row.cells.map(cell => {
                        return (
                          <StyledTableCell
                            id={cell.getCellProps().key}
                            {...cell.getCellProps()}
                          >
                            {cell.render("Cell")}
                          </StyledTableCell>
                        );
                      })}
                    </StyledTableRow>
                  )
              )}
            </TableBody>
          )}
          {props.loading || props.data.length === 0 ? (
            <HorizonEmptyBody cellsEachRow={props.columns.length} />
          ) : null}
        </Table>
        {props.loading === false && props.data.length === 0 && (
          <Overlay>
            <div>Empty</div>
          </Overlay>
        )}
      </div>
      {props.loading === true && (
        <Overlay>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "8px" }}>Loading Data:</span>
            <CircularProgress size={25} />
          </div>
        </Overlay>
      )}
      {props.enablePagination && (
        <HorizonPaginator table={table} data={props.data} />
      )}
    </Paper>
  );
};
HorizonTable.defaultProps = {
  data: [],
  loading: false,
  enablePagination: true
};
