import {useMemo} from "react";

export default function useRows() {
    const rows = useMemo(() => [
        {
            date: "2021-01-05",
            account: "100000256665",
            category: "Coffe",
            amount: "4.96",
            type: "Income"
        },
        {
            date: "2021-01-05",
            account: "100000256665",
            category: "Incoming Transfer",
            amount: "120",
            type: "Income"
        },
        {
            date: "2021-01-05",
            account: "100000256665",
            category: "Outgoing Transfer",
            amount: "325",
            type: "Income"
        },
        {
            date: "2021-01-05",
            account: "100000256665",
            category: "Candy",
            amount: "0.25",
            type: "Income"
        }, {
            date: "2021-01-05",
            account: "100000256665",
            category: "Gas",
            amount: "24",
            type: "Income"
        }, {
            date: "2021-01-10",
            account: "1225666998877",
            category: "Change Motor Oil",
            amount: "50",
            type: "Expenses"
        }, {
            date: "2021-01-10",
            account: "100000256665",
            category: "Internet Fee",
            amount: "24.69",
            type: "Expenses"
        }, {
            date: "2021-01-10",
            account: "100000256665",
            category: "Grosery",
            amount: "5",
            type: "Income"
        }, {
            date: "2021-01-10",
            account: "100000256665",
            category: "Salary",
            amount: "1100",
            type: "Expenses"
        }, {
            date: "2021-01-10",
            account: "100000256665",
            category: "Lunch",
            amount: "5",
            type: "Expenses"
        }, {
            date: "2021-01-10",
            account: "100000256665",
            category: "Date",
            amount: "90.54",
            type: "Expenses"
        }, {
            date: "2021-01-05",
            account: "100000256665",
            category: "Cinema",
            amount: "8.45",
            type: "Expenses"
        }, {
            date: "2021-01-05",
            account: "100000256665",
            category: "Buffalo Wings",
            amount: "35.36",
            type: "Expenses"
        }, {
            date: "2021-01-05",
            account: "100000256665",
            category: "Clothing",
            amount: "140",
            type: "Expenses"
        }, {
            date: "2021-01-05",
            account: "100000256665",
            category: "Guitar",
            amount: "75",
            type: "Expenses"
        }, {
            date: "2021-01-05",
            account: "100000256665",
            category: "Fried Chicken",
            amount: "12",
            type: "Expenses"
        }, {
            date: "2021-01-05",
            account: "100000256665",
            category: "Electricity",
            amount: "5",
            type: "Income"
        }, {
            date: "2021-01-05",
            account: "100000256665",
            category: "Autobus",
            amount: "5",
            type: "Income"
        }, {
            date: "2021-01-05",
            account: "100000256665",
            category: "Salary",
            amount: "5",
            type: "Income"
        }, {
            date: "2021-01-05",
            account: "100000256665",
            category: "Bonus",
            amount: "600",
            type: "Expenses"
        }, {
            date: "2021-01-05",
            account: "100000256665",
            category: "Netflix",
            amount: "12",
            type: "Expenses"
        }, {
            date: "2021-01-05",
            account: "100000256665",
            category: "Sofa",
            amount: "400",
            type: "Expenses"
        }, {
            date: "2021-01-05",
            account: "100000256665",
            category: "Laptop",
            amount: "500",
            type: "Expenses"
        }, {
            date: "2021-01-05",
            account: "100000256665",
            category: "Laundry",
            amount: "5",
            type: "Expenses"
        }, {
            date: "2021-01-05",
            account: "100000256665",
            category: "Coffe",
            amount: "5",
            type: "Expenses"
        }, {
            date: "2021-01-05",
            account: "100000256665",
            category: "Sweet Bread",
            amount: "5",
            type: "Expenses"
        }, {
            date: "2021-01-05",
            account: "1225666998877",
            category: "Beans",
            amount: "5",
            type: "Expenses"
        }, {
            date: "2021-01-05",
            account: "1225666998877",
            category: "Gas",
            amount: "5",
            type: "Expenses"
        }, {
            date: "2021-01-05",
            account: "100000256665",
            category: "Coronas",
            amount: "5",
            type: "Expenses"
        }, {
            date: "2021-01-05",
            account: "100000256665",
            category: "Coronas",
            amount: "5",
            type: "Expenses"
        }, {
            date: "2021-01-05",
            account: "100000256665",
            category: "Regias",
            amount: "50",
            type: "Expenses"
        }, {
            date: "2021-01-05",
            account: "1225666998877",
            category: "Electrolit",
            amount: "5",
            type: "Expenses"
        }, {
            date: "2021-01-05",
            account: "1225666998877",
            category: "Pizza",
            amount: "15",
            type: "Expenses"
        }
    ], []);

    return rows;
}
