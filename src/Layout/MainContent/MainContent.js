import { Link, Route, Routes } from "react-router-dom";
import HomePage from "../../HomePage/HomePage";
import BookingPage from "../../BookingPage/BookingPage";
import "./MainContent.css";
const MainContent = () => (
  <main>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/about" element={<HomePage scrollTo="about" />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  </main>
);

export default MainContent;

const NotFound = () => (
  <section className="row not-found">
    <h1>
      404 - Page not found -
      <span>
        <Link to="/"> Go to homepage</Link>
      </span>
    </h1>
  </section>
);
