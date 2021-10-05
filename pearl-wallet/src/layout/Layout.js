import React from 'react'
import { Route, Redirect } from 'react-router'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'

import { useContext } from 'react'
import AuthContext from '../context/auth-context'

const Layout = ({exact, path, component:Component, ...props}) => {

    //Get Context from auth-context
    const authContext = useContext(AuthContext)

    return (
        <Route 
            exact={exact} 
            path={path} 
            render={
                () => {
                    const userPages = 
                        <div className="App">
                            {/* Header with Menu and 'Link' to redirect Pages */}
                            <Header userName="Oscar Cornejo"/> {/*Get User Name from BE*/}

                            <main>
                                <Component {...props}/>
                            </main>

                            {/* Just the Footer */}
                            <Footer/>
                        </div>
                    
                    // If user is logged go to dashboard
                    if(authContext.currentUser) return userPages;

                    // If not logged redirect to register   
                    return <Redirect to='login'/>
                } 
            } 
        />
    )
}

export default Layout
