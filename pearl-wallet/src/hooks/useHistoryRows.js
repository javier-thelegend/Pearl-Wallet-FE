import { useMemo, useContext, useState, useEffect } from "react";
import AuthContext from '../context/auth-context';

export default function useRows(props) {
    const authContext = useContext(AuthContext);
    const [transactions, setTransactions] = useState([]);    

    useEffect(() => {
        const getTransactions = async () => {
            const idToken = await authContext.currentUser.getIdToken();
            let response = await fetch(process.env.REACT_APP_BACKEND_BASE_URL + "/transaction" +
                                                    "?account=" + props.account +
                                                    "&fromDate=" + props.fromDate +
                                                    "&toDate=" + props.toDate +
                                                    "&category=" + props.category, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${idToken}`
                }
                });
            let transactions = await response.json();
            console.log(transactions);
            setTransactions(transactions.data);
        }
        getTransactions();
    }, [props]);
    
    const rows = useMemo(() => {
        return transactions;
    });
    // const rows = useMemo(() => [], []);

    return rows;
}
