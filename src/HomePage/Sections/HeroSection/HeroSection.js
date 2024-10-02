import "./HeroSection.css";
import HeroImage from "../../../Images/HeroImage.jpg";
import ActionButton from "../../../Components/ActionButton/ActionButton";
import { useNavigate } from "react-router-dom";
const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <>
      <section>
        <article className="hero-section row">
          <div className="hero-left">
            <h1 className="lemon-yellow-text">Little Lemon</h1>
            <h2>Chicago</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <ActionButton onAction={() => navigate("/booking")}>
              Reserve a Table
            </ActionButton>
          </div>
          <div className="hero-image-container">
            <img src={HeroImage} alt="Chef holding plate of food" />
          </div>
        </article>
      </section>
    </>
  );
};

export default HeroSection;
