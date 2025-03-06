import InfoTable from "./InfoTable";

const ShippingTable = () => {
  return (
    <>
      <InfoTable
        title="Track Your Order"
        content={
          <p>
            When shipping your order, we will send a confirmation email with your
            tracking number. Refer to the tracking number for delivery updates.
          </p>
        }
      />

      <InfoTable
        title="Shipping Costs"
        content={
          <>
            <p>You can ship your order globally. Change your location at checkout.</p>
            <p>If you have a pre-order or personalized item, delivery times may be longer.</p>
            <p>Orders are shipped from Italy.</p>
          </>
        }
      />
    </>
  );
};

export default ShippingTable;
