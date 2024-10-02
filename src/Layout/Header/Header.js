import NavBar from "./Navbar/NavBar";
import Logo from "../../Images/Logo.svg";
import "./Header.css";
const Header = () => (
  <header className="row">
    <img src={Logo} alt="Little Lemon Logo" />
    <NavBar />
  </header>
);

export default Header;
