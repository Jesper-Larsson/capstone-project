import NavBar from "../NavBar";
import Logo from "../../Images/Logo.svg";
import "./Header.css";
const Header = () => (
  <header>
    <img src={Logo} alt="Little Lemon Logo" />
    <NavBar />
  </header>
);

export default Header;
