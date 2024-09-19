import "./Footer.css";
import BigLogo from "../../Images/BigLogo.png";
const Footer = () => (
  <footer>
    <img src={BigLogo} alt="Litte Lemon Logo" />
    <div>
      <b>Doormat Navigation</b>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Menu</li>
        <li>Reservations</li>
        <li>Order Online</li>
        <li>Login</li>
      </ul>
    </div>
    <div>
      <b>Contact</b>
      <ul>
        <li>Address</li>
        <li>Phone number</li>
        <li>Email</li>
      </ul>
    </div>
    <div>
      <b>Social Media Links</b>
      <ul>
        <li>Facebook</li>
        <li>Instagram</li>
        <li>Tiktok</li>
      </ul>
    </div>
  </footer>
);

export default Footer;
