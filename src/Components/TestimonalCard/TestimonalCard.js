import "./TestimonalCard.css";
const TestimonalCard = ({ photo, rating, name, reviewText }) => {
  const stars = [1, 2, 3, 4, 5].map((i) => (rating >= i ? "★" : "☆")).join("");

  return (
    <article className="testimonal-card">
      <div>{stars}</div>
      <div className="testimonal-middle">
        <img src={photo} alt={`Profile ${name}`}></img>
        <div>{name}</div>
      </div>
      <p>"{reviewText}"</p>
    </article>
  );
};
export default TestimonalCard;
