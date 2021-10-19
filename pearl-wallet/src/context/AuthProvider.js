import React from 'react'
import { useState, useEffect } from 'react'
import AuthContext from './auth-context'
import { auth } from '../services/firebase'
import { 
        createUserWithEmailAndPassword, 
        onAuthStateChanged,
        signInWithEmailAndPassword,
        signOut 
    } from 'firebase/auth'

const AuthProvider = (props) => {
    //CurrentUser
    const [currentUser, setCurrentUser] = useState({});
    const [loadingUserInfo, setLoadingUserInfo] = useState(true);

    //Register
    const register = (email, password) => {
        return new Promise(async (resolve, reject) => {
            try {
              const credentials = await createUserWithEmailAndPassword(auth, email, password);
              const idToken = await credentials.user.getIdToken();
              console.log(idToken);
            //   console.log(`${process.env.REACT_APP_BACKEND_BASE_URL}`);
              const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/user`, {
                                        method: 'POST',
                                        headers: {
                                          'Authorization': `Bearer ${idToken}`
                                        }
                                      });
              const data = await response.json();
            //   console.log(data);
              resolve(data);
            } catch(e) {
              reject(e);
            }
        });
    }

    //Login
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    //Logout
    const logout = () => {
        //Clean all localStorage variables
        localStorage.clear();
        return signOut(auth);
    }

    //Authentication handled by Firebase
    useEffect(() => {
        const unsubscriber = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoadingUserInfo(false);
        })
        return unsubscriber
    }, [])

    //Global variables we have access
    const authContext = {
        currentUser,
        register,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={authContext}>
            {!loadingUserInfo && props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
