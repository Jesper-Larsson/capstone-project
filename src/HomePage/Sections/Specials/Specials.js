import "./Specials.css";
import ActionButton from "../../../Components/ActionButton/ActionButton";
import DishCard from "../../../Components/DishCard/DishCard";
import greekSalad from "../../../Images/greek salad.jpg";
import bruchetta from "../../../Images/bruchetta.svg";
import lemonDesert from "../../../Images/lemon dessert.jpg";
import { useNavigate } from "react-router-dom";

const Specials = () => {
  const navigate = useNavigate();
  return (
    <section className="row">
      <div className="specials-top">
        <h1>This week's pecials!</h1>
        <ActionButton onAction={() => navigate("/menu")}>
          Online Menu
        </ActionButton>
      </div>
      <div className="specials-grid">
        <DishCard
          imgSrc={greekSalad}
          title="Greek salad"
          price="12.99"
          description="The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons."
        />
        <DishCard
          imgSrc={bruchetta}
          title="Bruchetta"
          price="5.99"
          description="Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil."
        />
        <DishCard
          imgSrc={lemonDesert}
          price="5.00"
          title="Lemon Dessert"
          description="This comes straight from grandma’s recipe book, every last ingredient has been sourced and is as authentic as can be imagined."
        />
      </div>
    </section>
  );
};

export default Specials;
