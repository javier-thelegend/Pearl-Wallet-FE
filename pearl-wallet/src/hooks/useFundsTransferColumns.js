import {useMemo} from "react";

export default function useColumns() {
    const columns = useMemo(() => [
        {
            Header: "Date",
            accessor: "date"
        },
        {
            Header: "Account",
            accessor: "account"
        },
        {
            Header: "Type",
            accessor: "type"
        },
        {
            Header: "Category",
            accessor: "category"
        },
        {
            Header: "Amount",
            accessor: "amount"
        }
    ], []);

    return columns;
}
