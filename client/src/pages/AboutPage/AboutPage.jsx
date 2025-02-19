import { useEffect } from "react";
import AboutUsGrid from "../../components/About/AboutUsGrid";

const AboutPage = () => {

  useEffect(() => {
    document.title = "About us";
  }, []);

    return ( 
      <AboutUsGrid />
    );
  };
  

  export default AboutPage;
  