import React from "react";
import Item from "./InvoiceItem";
import { MdClearAll } from "react-icons/md";

const InvoiceList = ({
  invoiceItems,
  clearItems,
  handleDelete,
  handleEdit
}) => {
  return (
    <div className="container">
      <ul className="list-group">
        {invoiceItems.map(invoiceItem => {
          return (
            <Item
              key={invoiceItem.id}
              invoiceItem={invoiceItem}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          );
        })}
      </ul>

      <div className="btn-container my-2">
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
