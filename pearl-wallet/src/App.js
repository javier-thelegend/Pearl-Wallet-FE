import { Switch, Route } from "react-router-dom";

import './App.css';
import Account from './pages/Account';
import NewAccount from './pages/NewAccount';
import NewFundsTransfer from './pages/NewFundsTransfer';
import Currency from './pages/Currency';
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
                <Layout exact path="/" component={Account} />
                <Layout exact path="/account/new" component={NewAccount} />
                <Layout exact path="/transfer/new" component={NewFundsTransfer} />
                <Layout exact path="/transaction/new" component={NewTransaction} />
                <Layout path="/currency" component={Currency} />
                <Layout path="/history" component={History} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
            </Switch>
        </AuthProvider>
    );
}
export default App;
