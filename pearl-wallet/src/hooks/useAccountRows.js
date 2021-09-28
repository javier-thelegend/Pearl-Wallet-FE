import {useMemo} from "react";

export default function useRows() {
    const rows = useMemo(() => [
        {
            date: "2021-01-05",
            movement: "Debit",
            description: "Coffe",
            amount: "4.96",
            balance: "1520"
        },
        {
            date: "2021-01-05",
            movement: "Credit",
            description: "Incoming Transfer",
            amount: "120",
            balance: "1520"
        },
        {
            date: "2021-01-05",
            movement: "Debit",
            description: "Outgoing Transfer",
            amount: "325",
            balance: "1520"
        },
        {
            date: "2021-01-05",
            movement: "Credit",
            description: "Candy",
            amount: "0.25",
            balance: "1520"
        }, {
            date: "2021-01-05",
            movement: "Debit",
            description: "Gas",
            amount: "24",
            balance: "1520"
        }, {
            date: "2021-01-05",
            movement: "Credit",
            description: "Change Motor Oil",
            amount: "50",
            balance: "1520"
        }, {
            date: "2021-01-05",
            movement: "Debit",
            description: "Internet Fee",
            amount: "24.69",
            balance: "1520"
        }, {
            date: "2021-01-05",
            movement: "Debit",
            description: "Grosery",
            amount: "5",
            balance: "40.21"
        }, {
            date: "2021-01-05",
            movement: "Debit",
            description: "Salary",
            amount: "1100",
            balance: "1520"
        }, {
            date: "2021-01-05",
            movement: "Debit",
            description: "Lunch",
            amount: "5",
            balance: "1520"
        }, {
            date: "2021-01-05",
            movement: "Debit",
            description: "Date",
            amount: "90.54",
            balance: "1520"
        }, {
            date: "2021-01-05",
            movement: "Debit",
            description: "Cinema",
            amount: "8.45",
            balance: "1520"
        }, {
            date: "2021-01-05",
            movement: "Debit",
            description: "Buffalo Wings",
            amount: "35.36",
            balance: "1520"
        }, {
            date: "2021-01-05",
            movement: "Debit",
            description: "Clothing",
            amount: "140",
            balance: "1520"
        }, {
            date: "2021-01-05",
            movement: "Debit",
            description: "Guitar",
            amount: "75",
            balance: "1520"
        }, {
            date: "2021-01-05",
            movement: "Debit",
            description: "Fried Chicken",
            amount: "12",
            balance: "1520"
        }, {
            date: "2021-01-05",
            movement: "Debit",
            description: "Electricity",
            amount: "5",
            balance: "35"
        }, {
            date: "2021-01-05",
            movement: "Debit",
            description: "Autobus",
            amount: "5",
            balance: "2"
        }, {
            date: "2021-01-05",
            movement: "Debit",
            description: "Salary",
            amount: "5",
            balance: "1000"
        }, {
            date: "2021-01-05",
            movement: "Debit",
            description: "Bonus",
            amount: "600",
            balance: "1520"
        }, {
            date: "2021-01-05",
            movement: "Debit",
            description: "Netflix",
            amount: "12",
            balance: "1520"
        }, {
            date: "2021-01-05",
            movement: "Debit",
            description: "Sofa",
            amount: "400",
            balance: "1520"
        }, {
            date: "2021-01-05",
            movement: "Debit",
            description: "Laptop",
            amount: "500",
            balance: "1520"
        }, {
            date: "2021-01-05",
            movement: "Debit",
            description: "Laundry",
            amount: "5",
            balance: "1520"
        }, {
            date: "2021-01-05",
            movement: "Debit",
            description: "Coffe",
            amount: "5",
            balance: "1520"
        }, {
            date: "2021-01-05",
            movement: "Debit",
            description: "Sweet Bread",
            amount: "5",
            balance: "1520"
        }, {
            date: "2021-01-05",
            movement: "Credit",
            description: "Beans",
            amount: "5",
            balance: "1520"
        }, {
            date: "2021-01-05",
            movement: "Credit",
            description: "Gas",
            amount: "5",
            balance: "1520"
        }, {
            date: "2021-01-05",
            movement: "Debit",
            description: "Coronas",
            amount: "5",
            balance: "1520"
        }, {
            date: "2021-01-05",
            movement: "Debit",
            description: "Coronas",
            amount: "5",
            balance: "1520"
        }, {
            date: "2021-01-05",
            movement: "Debit",
            description: "Regias",
            amount: "50",
            balance: "1520"
        }, {
            date: "2021-01-05",
            movement: "Credit",
            description: "Electrolit",
            amount: "5",
            balance: "1520"
        }, {
            date: "2021-01-05",
            movement: "Credit",
            description: "Pizza",
            amount: "15",
            balance: "1520"
        }
    ], []);

    return rows;
}
