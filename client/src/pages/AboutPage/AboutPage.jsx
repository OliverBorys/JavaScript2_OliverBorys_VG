import { useEffect } from "react";

const AboutPage = () => {

  useEffect(() => {
    document.title = "About us";
  }, []);

    return <h1 className="text-center text-2xl mt-20 font-bold">About Us</h1>;
  };
  

  export default AboutPage;
  