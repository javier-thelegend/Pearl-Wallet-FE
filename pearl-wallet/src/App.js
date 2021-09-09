import './App.css';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Main from "./components/main/Main";

function App() {
    return (
        <div className="App">
            <Header userName="Oscar Cornejo"/> {/*Get User Name from BE*/}
            <Main/>
            <Footer/>
        </div>
    );
}

export default App;
