import { useEffect } from "react";
import Accordion from "../../components/Admin/AdminPage/Accordion";
import ProductTable from "../../components/Admin/AdminPage/ProductTable";
import HeroImageForm from "../../components/Admin/AdminPage/HeroImageForm";
import AdminUserSection from "../../components/Admin/AdminPage/AdminUserSection";

const AdminPage = () => {

  useEffect(() => {
    document.title = "Administration";
  }, []);

  return (
    <main className="mt-20 lg:mt-24">
        <h1 className="text-center my-8 text-2xl font-medium text-gray-800">Administration</h1>
      <section className="px-4 md:px-6 md:mx-6 lg:mx-16">
        <Accordion title="Products Administration">
          <ProductTable />
        </Accordion>

        <Accordion title="Hero Pictures">
          <HeroImageForm />
        </Accordion>

        <Accordion title="Admin User">
          <AdminUserSection />
        </Accordion>
      </section>
    </main>
  );
};

export default AdminPage;
