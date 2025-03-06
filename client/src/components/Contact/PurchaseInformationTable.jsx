import InfoTable from "./InfoTable";

const PurchaseInformationTable = () => {
  return (
    <>
      <InfoTable
        title="Purchase Methods"
        content={
          <>
            <p>We accept:</p>
            <ul className="list-disc pl-5 text-gray-900">
              <li>Visa, Mastercard</li>
              <li>American Express</li>
              <li>Swish</li>
              <li>Klarna</li>
            </ul>
          </>
        }
      />

      <InfoTable
        title="Duty & Tax"
        content={
          <p>
            No additional import taxes or duties apply unless shipped to Russia or Canada.
          </p>
        }
      />
    </>
  );
};

export default PurchaseInformationTable;
