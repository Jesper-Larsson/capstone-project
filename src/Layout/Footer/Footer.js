import "./Footer.css";
import BigLogo from "../../Images/BigLogo.png";
import { Link } from "react-router-dom";
const Footer = () => (
  <footer className="row footer">
    <img src={BigLogo} alt="Litte Lemon Logo" />
    <article>
      <b>Page Navigation</b>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/menu">Menu</Link>
        </li>
        <li>
          <Link to="/booking">Reservations</Link>
        </li>
        <li>
          <Link to="/order">Order Online</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </article>
    <article>
      <b>Contact</b>
      <ul>
        <li>1st Lemon St.</li>
        <li>123 456 789</li>
        <li>
          <a href="mailto:little-lemon@abc123.com">Email us</a>
        </li>
      </ul>
    </article>
    <article>
      <b>Social Media Links</b>
      <ul>
        <li>
          <a href="https://www.facebook.com/little-lemon">Facebook</a>
        </li>
        <li>
          <a href="https://www.instagram.com/little-lemon">Instagram</a>
        </li>
        <li>
          <a href="https://www.tiktok.com/little-lemon">TikTok</a>
        </li>
      </ul>
    </article>
  </footer>
);

export default Footer;
