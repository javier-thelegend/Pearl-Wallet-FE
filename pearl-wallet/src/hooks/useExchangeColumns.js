import {useMemo} from "react";

export default function useColumns() {
    const columns = useMemo(() => [
        {
            Header: "Equivalence",
            accessor: "equivalence"
        },
        {
            Header: "Currency",
            accessor: "currency"
        }
    ], []);

    return columns;
}
