import "./AboutSection.css";
import restaurantImage from "../../../Images/restaurant.jpg";
import chefsImage from "../../../Images/Mario and Adrian b.jpg";
const AboutSection = () => (
  <section className="row">
    <article className="about">
      <div className="about-half">
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div
        className="about-half"
        role="img"
        aria-label="A collage of the restaurant and the chefs."
      >
        <div className="about-image-container about-left-image">
          <img
            className="about-img-left"
            src={restaurantImage}
            alt="The restaurant."
          />
        </div>
        <div className="about-image-container about-right-image">
          <img className="about-img-right" src={chefsImage} alt="The chefs." />
        </div>
      </div>
    </article>
  </section>
);

export default AboutSection;
