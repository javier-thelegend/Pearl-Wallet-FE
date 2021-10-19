import {useMemo} from "react";

export default function useColumns() {
    const columns = useMemo(() => [
        {
            Header: "Date",
            accessor: "transaction_date"
        }, {
            Header: "Type",
            accessor: "transaction_type"
        }, {
            Header: "Category",
            accessor: "category"
        }, {
            Header: "Amount",
            accessor: "amount"
        }, {
            Header: "Balance",
            accessor: "balance"
        }
    ], []);

    return columns;
}
