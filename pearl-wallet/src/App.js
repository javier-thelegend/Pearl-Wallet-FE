import { Switch, Route } from "react-router-dom";

import './App.css';
import Main from "./components/main/Main";
import Account from './pages/Account';
import Transfer from './pages/Transfer';
import Income from './pages/Income';
import Expenses from './pages/Expenses';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Layout from "./layout/Layout";
import AuthProvider from "./context/AuthProvider";

function App() {
    return (
        <AuthProvider>
            <Switch>
                <Layout path="/account" component={Account} />
                <Layout path="/transfer" component={Transfer} />
                <Layout path="/income" component={Income} />
                <Layout path="/expenses" component={Expenses} />
                <Layout exact path="/" component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
            </Switch>
        </AuthProvider>
    );
}
export default App;
