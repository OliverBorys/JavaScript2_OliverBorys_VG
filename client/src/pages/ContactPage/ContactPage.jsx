import { useEffect } from "react";
import ContactAccordion from "../../components/Contact/ContactAccordion";
import ContactTable from "../../components/Contact/ContactTable";
import ShippingTable from "../../components/Contact/ShippingTable";
import PurchaseInformationTable from "../../components/Contact/PurchaseInformationTable";

const ContactPage = () => {
  useEffect(() => {
    document.title = "Contact";
  }, []);

  return (
    <main className="mt-20 lg:mt-24">
      <header className="text-center my-8">
        <h1 className="text-2xl font-medium text-gray-800">Contact Page</h1>
      </header>

      <section className="px-4 md:px-6 md:mx-6 lg:mx-16">
        <ContactAccordion title="Contact Us">
          <ContactTable />
        </ContactAccordion>
        <ContactAccordion title="Shipping">
          <ShippingTable />
        </ContactAccordion>
        <ContactAccordion title="Purchase Information">
          <PurchaseInformationTable />
        </ContactAccordion>
      </section>
    </main>
  );
};

export default ContactPage;
