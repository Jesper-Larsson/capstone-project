import AboutSection from "../../Sections/AboutSection";
import HeroSection from "../../Sections/HeroSection";
import Specials from "../../Sections/Specials";
import Testimonals from "../../Sections/Testimonals";
import "./MainContent.css";
const MainContent = () => (
  <main>
    <HeroSection />
    <Specials />
    <Testimonals />
    <AboutSection />
  </main>
);

export default MainContent;
