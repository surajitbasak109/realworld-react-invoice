import React from "react";
import Item from "./InvoiceItem";
import { MdClearAll } from "react-icons/md";

const InvoiceList = ({ invoiceItems, clearItems }) => {
  return (
    <div className="container">
      <ul className="list-group">
        {invoiceItems.map(invoiceItem => {
          return <Item key={invoiceItem.id} invoiceItem={invoiceItem} />;
        })}
      </ul>

      <div className="btn-container">
        <button
          type="button"
          className="btn btn-danger btn-flat btn-block"
          onClick={clearItems}
        >
          <MdClearAll /> Clear All
        </button>
      </div>
    </div>
  );
};

export default InvoiceList;
