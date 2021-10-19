import { useMemo, useContext, useState, useEffect } from "react";
import AuthContext from '../context/auth-context';

export default function useRows(account) {
    const authContext = useContext(AuthContext);
    const [transactions, setTransactions] = useState([]);    

    useEffect(() => {
        // console.log("useAccountRows : " + account);
        const getTransactions = async () => {
            if(account){
                const idToken = await authContext.currentUser.getIdToken();
                let response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/account/${account}/transactions`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${idToken}`
                    }
                    });
                let transactions = await response.json();
                setTransactions(transactions.data);
            }
        }
        getTransactions();
    }, [account]);
    
    const rows = useMemo(() => {
        return transactions;
    });
    // const rows = useMemo(() => [], []);

    return rows;
}
