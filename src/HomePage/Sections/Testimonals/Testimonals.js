import TestimonalCard from "../../../Components/TestimonalCard/TestimonalCard";
import CarlPhoto from "../../../Images/Carl.jpg";
import LisaPhoto from "../../../Images/Lisa.jpg";
import ElsaPhoto from "../../../Images/Elsa.jpg";
import JohnnyPhoto from "../../../Images/Johnny.jpg";

import "./Testimonals.css";
const Testimonals = () => (
  <section className="row testimonals">
    <h1>Testimonals</h1>
    <div className="testimonal-cards">
      <TestimonalCard
        photo={CarlPhoto}
        rating={5}
        name="Carl"
        reviewText="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      />
      <TestimonalCard
        photo={LisaPhoto}
        rating={3}
        name="Lisa"
        reviewText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
      />
      <TestimonalCard
        photo={ElsaPhoto}
        rating={4}
        name="Elsa"
        reviewText="Lorem ipsum dolor sit amet."
      />
      <TestimonalCard
        photo={JohnnyPhoto}
        rating={4}
        name="Johnny"
        reviewText="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      />
    </div>
  </section>
);

export default Testimonals;
