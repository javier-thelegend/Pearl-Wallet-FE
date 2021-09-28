import { useTable, useSortBy } from "react-table";
import { useGlobalFilter, useAsyncDebounce } from "react-table";
import { usePagination } from "react-table";
import { useState } from "react";
import * as Icon from 'react-bootstrap-icons';

import AccountTableCss from './AccountTable.module.css';
import useColumns from "../../hooks/useAccountColumns";
import useRows from "../../hooks/useAccountRows";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

function AccountFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {
  const totalMovements = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);

  const onFilterChange = useAsyncDebounce(
    (value) => setGlobalFilter(value || undefined),
    200
  );

  const handleInputChange = (e) => {
    setValue(e.target.value);
    onFilterChange(e.target.value);
  };

  return (
    <span className="movement-filter">
      Search: &nbsp;{" "}
      <input
        size={40}
        value={value || ""}
        onChange={handleInputChange}
        placeholder={`${totalMovements} Account Movementes`}
      />
    </span>
  );
}

export default function AccountTable() {
  const columns = useColumns();
  const data = useRows();
  const table = useTable({
      columns, 
      data, 
      initialState: {
        pageSize: 10,
        pageIndex: 0
      }
    }, 
    useGlobalFilter,  
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { globalFilter, pageIndex, pageSize }
  } = table;

  return (
    <>
      {/* Apply the table props */}
      <table className={AccountTableCss.table} {...getTableProps()}>
        <thead>
        <tr>
            <th className={AccountTableCss.filter} colSpan={5}>
              <AccountFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>

          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // Aplicamos las propiedades de ordenación a cada columna
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted ? column.isSortedDesc ? "desc" : "asc" : ""
                  }
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            page.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <td {...cell.getCellProps()}>
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>  

        <Container className={AccountTableCss.pagination}>
          <Row>
            <Col sm={2}>
              <span>
                  Page {" "}
                  <strong>
                      {pageIndex + 1} of {pageOptions.length}
                  </strong>
              </span>
            </Col>
            <Col sm={8}>
              <div className={AccountTableCss.controls}>
                  <button className={AccountTableCss.pageController} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    <Icon.ChevronBarLeft color='black' size={14}/>
                  </button>
                  <button className={AccountTableCss.pageController} onClick={() => previousPage()} disabled={!canPreviousPage}>
                    <Icon.ChevronLeft color='black' size={14}/>
                  </button>
                  <button className={AccountTableCss.pageController} onClick={() => nextPage()} disabled={!canNextPage}>
                    <Icon.ChevronRight color='black' size={14}/>
                  </button>
                  <button className={AccountTableCss.pageController} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    <Icon.ChevronBarRight color='black' size={14}/>
                  </button>
              </div>
            </Col>
            <Col sm={2}>
              <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                  {[10, 25, 50, 100].map(pageSize => (
                      <option key={pageSize} value={pageSize}>
                          Show {pageSize}
                      </option>
                  ))}
              </select>
            </Col>
          </Row>
        </Container>
    </>
  );
}