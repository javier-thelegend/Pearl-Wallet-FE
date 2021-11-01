import { useMemo, useContext, useState, useEffect } from "react";
import AuthContext from '../context/auth-context';

export default function useRows() {
    const authContext = useContext(AuthContext);
    const [currencies, setCurrencies] = useState([]);    

    useEffect(() => {
        const getCurrencies = async () => {
            const idToken = await authContext.currentUser.getIdToken();
            let response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/currency`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${idToken}`
                }
                });
            let currencies = await response.json();
            setCurrencies(currencies.data);
            // console.log("useEffect#"+currencies);
        }
        getCurrencies();
    }, []);
    
    const rows = useMemo(() => {
        // console.log("useMemo#"+currencies);
        return currencies;
    });
    // const rows = useMemo(() => [], []);

    return rows;
}
