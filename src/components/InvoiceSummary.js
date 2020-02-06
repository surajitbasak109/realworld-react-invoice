import React from "react";

const InvoiceSummary = ({ invoiceItems }) => {
  return (
    <div className="container text-right">
      <h1 className="h6">
        Invoice Total:{" "}
        <span className="total">
          Rs.{" "}
          {invoiceItems
            .reduce((acc, curr) => (acc += parseFloat(curr.itemAmount)), 0)
            .toFixed(2)}
        </span>
      </h1>
    </div>
  );
};

export default InvoiceSummary;
