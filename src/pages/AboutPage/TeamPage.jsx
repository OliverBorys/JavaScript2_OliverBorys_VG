import { useEffect } from "react";

const TeamPage = () => {
    useEffect(() => {
      document.title = "Team";
    }, []);

    return <h1 className="text-center text-2xl mt-20 font-bold">Team Page</h1>;
  };
  
  export default TeamPage;
  