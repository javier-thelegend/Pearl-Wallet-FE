import {useMemo} from "react";

export default function useColumns() {
    const columns = useMemo(() => [
        {
            Header: "Date",
            accessor: "date"
        },
        {
            Header: "Movement",
            accessor: "movement"
        },
        {
            Header: "Description",
            accessor: "description"
        },
        {
            Header: "Amount",
            accessor: "amount"
        }, {
            Header: "Balance",
            accessor: "balance"
        }
    ], []);

    return columns;
}
