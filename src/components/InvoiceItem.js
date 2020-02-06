import React, { useEffect, useRef } from "react";
import { MdEdit, MdDelete } from "react-icons/md";

const InvoiceItem = ({ invoiceItem }) => {
  const titleRef = useRef();
  useEffect(() => {}, []);
  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-lg-1 col-sm-12">{invoiceItem.itemCode}</div>
        <div className="col-lg-6 col-sm-12">{invoiceItem.itemName}</div>
        <div className="col-lg-1 col-sm-12 text-lg-center">
          {invoiceItem.itemQty}
        </div>
        <div className="col-lg-1 col-sm-12 text-lg-right">
          {parseFloat(invoiceItem.itemRate).toFixed(2)}
        </div>
        <div className="col-lg-1 col-sm-12 text-lg-right">
          {(
            parseFloat(invoiceItem.itemQty) * parseFloat(invoiceItem.itemRate)
          ).toFixed(2)}
        </div>
        <div className="col-lg-1 col-6 text-lg-center">
          <button
            type="button"
            className="btn btn-success btn-sm"
            title="Edit"
            data-toggle="tooltip"
          >
            <MdEdit />
          </button>
        </div>
        <div className="col-lg-1 col-6 text-lg-center">
          <button
            type="button"
            className="btn btn-danger btn-sm"
            title="Delete"
            data-toggle="tooltip"
          >
            <MdDelete />
          </button>
        </div>
      </div>
    </li>
  );
};

export default InvoiceItem;
