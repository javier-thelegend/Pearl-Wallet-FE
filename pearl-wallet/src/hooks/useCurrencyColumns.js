import {useMemo} from "react";

export default function useColumns() {
    const columns = useMemo(() => [
        {
            Header: "Id",
            accessor: "id"
        },
        {
            Header: "Description",
            accessor: "description"
        },
        {
            Header: "ISO Code",
            accessor: "iso_code"
        }
    ], []);

    return columns;
}
