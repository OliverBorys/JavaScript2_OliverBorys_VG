import { Link } from "react-router-dom";

const ContactTable = () => {
  return (
    <section className="grid grid-cols-3 space-x-3 border-t -mt-4 py-4">
      <div className="col-span-2">
        <h2 className="uppercase font-medium">Phone</h2>
        <p>
          Our Client Advisors are available to answer your call from Monday to
          Sunday from 10 am to 7 pm, Central European Time.
        </p>
      </div>
      <div className="text-right content-center mr-0">
        <p className="inline-block bg-black py-2 px-3 text-white">
          Call us: 0707587445
        </p>
      </div>
      <div className="col-span-3 mt-2 bg-gray-400 h-[1px] mr-0"></div>
      <div className="col-span-2 mt-4">
        <h2 className="uppercase font-medium">E-mail</h2>
        <p>
          To reach our online Client Assistants by email, click &quot;email
          us&quot; to provide details and your contact information.
        </p>
      </div>
      <div className="text-right content-center mr-0">
        {/* Or https://mail.google.com/mail/?view=cm&fs=1&to=example@gmail.com */}
        <Link to="mailto:example@gmail.com"
          target="_blank"
          className="inline-block bg-black py-2 px-3 text-white duration-500 hover:scale-90"
        >
          E-mail us
        </Link>
      </div>
      <div className="col-span-3 mt-2 bg-gray-400 h-[1px] mr-0"></div>
      <div className="col-span-2 mt-4">
        <h2 className="uppercase font-medium">Address</h2>
        <p>G Commerce Europe SpA</p>
        <p>Via Don Lorenzo Perosi, 6</p>
        <p>50018 Scandicci Florence - ITALY</p>
      </div>
    </section>
  );
};

export default ContactTable;
