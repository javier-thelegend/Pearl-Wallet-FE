import { Switch, Route } from "react-router-dom";

import './App.css';
import Main from "./components/main/Main";
import Account from './pages/Account';
import NewAccount from './pages/NewAccount';
import NewFundsTransfer from './pages/NewFundsTransfer';
import Transaction from './pages/Transaction';
import NewTransaction from './pages/NewTransaction';
import History from './pages/History';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Layout from "./layout/Layout";
import AuthProvider from "./context/AuthProvider";

function App() {
    return (
        <AuthProvider>
            <Switch>
                <Layout exact path="/account" component={Account} />
                <Layout exact path="/account/new" component={NewAccount} />
                <Layout path="/transfer/new" component={NewFundsTransfer} />
                <Layout exact path="/transaction" component={Transaction} />
                <Layout exact path="/transaction/new" component={NewTransaction} />
                <Layout path="/history" component={History} />
                <Layout exact path="/" component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
            </Switch>
        </AuthProvider>
    );
}
export default App;
