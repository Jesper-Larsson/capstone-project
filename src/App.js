import "./App.css";
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";
import MainContent from "./Layout/MainContent/MainContent";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Header />
        <MainContent />
        <Footer />
      </Router>
    </>
  );
}

export default App;
