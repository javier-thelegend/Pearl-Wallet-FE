import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import './App.css';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Main from "./components/main/Main";
import Account from './pages/Account';
import Transfer from './pages/Transfer';
import Income from './pages/Income';
import Expenses from './pages/Expenses';

function App() {
    return (
        <div className="App">
            {/* Redirect Pages */}
            <Router>

                {/* Header with Menu and 'Link' to redirect Pages */}
                <Header userName="Oscar Cornejo"/> {/*Get User Name from BE*/}

                {/* Redirect Pages */}
                <Switch>
                    <Route path="/Account">
                        <Account />
                    </Route>
                    <Route path="/Transfer">
                        <Transfer />
                    </Route>
                    <Route path="/Income">
                        <Income />
                    </Route>
                    <Route path="/Expenses">
                        <Expenses />
                    </Route>
                    <Route path="/">
                        <Main />
                    </Route>
                </Switch>
            </Router>
            
            {/* Just the Footer */}
            <Footer/>
        </div>
    );
}
export default App;
