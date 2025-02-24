const ShippingTable = () => {
  return (
    <section className="border-t -mt-4 py-4">
      <div className="col-span-2">
        <h2 className="uppercase font-medium">Track Your Order</h2>
        <p>
          When shipping your order, we will send a confirmation email with your
          tracking number to confirm that your order has been accepted. For the
          latest on your delivery, please refer to the tracking number included
          in your shipping confirmation email.
        </p>
      </div>
      <div className="col-span-3 mt-2 bg-gray-400 h-[1px] mr-0"></div>
      <div className="col-span-2 mt-4">
        <h2 className="uppercase font-medium">Shipping costs</h2>
        <div className="space-y-3">
          <p>
            You can ship your order to any of our global shipping destinations.
            At checkout, simply change your location to where you would like
            your order shipped.
          </p>
          <p>
            If you have a pre-order or personalised item, delivery times could
            take longer.
          </p>
          <p>Orders are shipped from the Italy.</p>
        </div>
      </div>
    </section>
  );
};

export default ShippingTable;
