import "./DishCard.css";
import delivery from "../../Images/delivery.png";
const DishCard = ({ imgSrc, title, description, price }) => {
  return (
    <article className="dish-card">
      <div className="dish-image-container">
        <img src={imgSrc} alt={title} />
      </div>
      <div className="dish-card-info">
        <div className="dish-card-top">
          <h2>{title}</h2>
          <div role="img" aria-label={`Price icon with price: $${price}.`}>
            ${price}
          </div>
        </div>
        <div className="dish-card-bottom">
          <div>
            <p>{description}</p>
          </div>
          <div className="dish-card-delivery">
            <b>Order a delivery</b>
            <img src={delivery} alt="Deliver to me" />
          </div>
        </div>
      </div>
    </article>
  );
};

export default DishCard;
