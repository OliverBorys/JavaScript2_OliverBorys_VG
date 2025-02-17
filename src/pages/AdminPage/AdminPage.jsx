import { useEffect } from "react";
import Accordion from "../../components/Admin/AdminPage/Accordion";
import ProductTable from "../../components/Admin/AdminPage/ProductTable";
import HeroImageForm from "../../components/Admin/AdminPage/HeroImageForm";
import AdminUserSection from "../../components/Admin/AdminPage/AdminUserSection.jsx";

const AdminPage = () => {
  useEffect(() => {
    document.title = "Administration";
  }, []);

  return (
    <main className="mt-28 p-4 md:p-6 md:mx-6 lg:mx-16">
      <header className="text-center my-8">
        <h1 className="text-2xl font-medium text-gray-800">Shop</h1>
      </header>
      <section className="w-full">
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
