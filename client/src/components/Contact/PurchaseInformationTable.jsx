const PurchaseInformationTable = () => {
  return (
    <section className="border-t -mt-4 py-4">
      <div className="col-span-2">
        <h2 className="uppercase font-medium">Purchase methods</h2>
        <p>We accept:</p>
        <ul className="list-disc pl-5 text-gray-900">
          <li>Visa, Mastercard</li>
          <li>American Express</li>
          <li>Swish</li>
          <li>Klarna</li>
        </ul>
      </div>
      <div className="col-span-3 mt-2 bg-gray-400 h-[1px] mr-0"></div>
      <div className="col-span-2 mt-4">
        <h2 className="uppercase font-medium">Duty & tax</h2>
          <p>
            You will not be charged any additional import taxes or duties on
            receipt of your item, unless your order is being shipped to Russia
            or Canada. Orders shipped to Russia and Canada will be subject to
            customs duties on import.
          </p>
      </div>
    </section>
  );
};

export default PurchaseInformationTable;
