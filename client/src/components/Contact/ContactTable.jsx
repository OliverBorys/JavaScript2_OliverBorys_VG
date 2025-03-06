import InfoTable from "./InfoTable";
import { Link } from "react-router-dom";

const ContactTable = () => {
  return (
    <>
      <InfoTable
        title="Phone"
        content={
          <>
            <p>Our Client Advisors are available from Monday to Sunday, 10 am - 7 pm CET.</p>
            <p className="inline-block bg-black py-2 px-3 text-white">Call us: 0707587445</p>
          </>
        }
      />

      <InfoTable
        title="E-mail"
        content={
          <>
            <p>Contact our online Client Assistants via email:</p>
            <Link to="mailto:example@gmail.com" target="_blank" className="inline-block bg-black py-2 px-3 text-white duration-500 hover:scale-90">
              E-mail us
            </Link>
          </>
        }
      />

      <InfoTable
        title="Address"
        content={
          <>
            <p>G Commerce Europe SpA</p>
            <p>Via Don Lorenzo Perosi, 6</p>
            <p>50018 Scandicci Florence - ITALY</p>
          </>
        }
      />
    </>
  );
};

export default ContactTable;
