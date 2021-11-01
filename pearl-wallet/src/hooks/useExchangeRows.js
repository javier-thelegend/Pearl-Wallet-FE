import { useMemo, useContext, useState, useEffect } from "react";
import AuthContext from '../context/auth-context';

export default function useRows(currency) {
    const authContext = useContext(AuthContext);
    const [exchanges, setExchanges] = useState([]);    

    useEffect(() => {
        const getExchanges = async () => {
            if(currency){
                const idToken = await authContext.currentUser.getIdToken();
                let response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/exchange/${currency}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${idToken}`
                    }
                    });
                let exchanges = await response.json();
                setExchanges(exchanges.data);
                // console.log("useEffect#"+exchanges);
            }
        }
        getExchanges();
    }, [currency]);
    
    const rows = useMemo(() => {
        // console.log("useMemo#"+exchanges);
        return exchanges;
    });
    // const rows = useMemo(() => [], []);

    return rows;
}
