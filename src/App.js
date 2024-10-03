import "./App.css";
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";
import Main from "./Layout/MainContent/Main";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Main />
        <Footer />
      </Router>
    </>
  );
}

export default App;
