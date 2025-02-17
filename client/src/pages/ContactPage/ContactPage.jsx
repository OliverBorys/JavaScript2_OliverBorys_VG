import { useEffect } from "react";

const ContactPage = () => {
  useEffect(() => {
    document.title = "Contact";
  }, []);
  return <h1 className="text-center text-2xl mt-20 font-bold">Contact Page</h1>;
};

export default ContactPage;
