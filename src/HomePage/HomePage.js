import Testimonals from "./Sections/Testimonals/Testimonals";
import AboutSection from "./Sections/AboutSection/AboutSection";
import HeroSection from "./Sections/HeroSection/HeroSection";
import Specials from "./Sections/Specials/Specials";
import { useEffect, useRef } from "react";

const HomePage = ({ scrollTo }) => {
  const aboutRef = useRef(null);
  const homeRef = useRef(null);
  useEffect(() => {
    switch (scrollTo) {
      case "about":
        aboutRef.current.scrollIntoView();
        break;
      default:
        homeRef.current.scrollIntoView();
        break;
    }
  }, [scrollTo]);
  return (
    <>
      <div ref={homeRef}>
        <HeroSection />
      </div>
      <Specials />
      <Testimonals />
      <div ref={aboutRef}>
        <AboutSection />
      </div>
    </>
  );
};

export default HomePage;
