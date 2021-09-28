import React from 'react'
import { useState, useEffect } from 'react'
import AuthContext from './auth-context'
import { auth } from '../services/firebase'
import { createUserWithEmailAndPassword, 
        onAuthStateChanged,
        signInWithEmailAndPassword,
        signOut 
} from 'firebase/auth'

const AuthProvider = (props) => {
    //CurrentUser
    const [currentUser, setCurrentUser] = useState({})

    //Register
    const register = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //Login
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    //Logout
    const logout = () => {
        return signOut(auth)
    }

    //Authentication handled by Firebase
    useEffect(() => {
        let unsubscriber = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
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
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
