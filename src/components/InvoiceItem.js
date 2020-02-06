import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";

const InvoiceItem = ({ invoiceItem, handleDelete, handleEdit }) => {
  const { id, itemName, itemCode, itemUnit, itemQty, itemRate } = invoiceItem;
  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-lg-1 col-sm-12">{itemCode}</div>
        <div className="col-lg-4 col-sm-12">{itemName}</div>
        <div className="col-lg-1 col-sm-12 text-lg-center">{itemUnit}</div>
        <div className="col-lg-1 col-sm-12 text-lg-center">{itemQty}</div>
        <div className="col-lg-1 col-sm-12 text-lg-right">
          {parseFloat(itemRate).toFixed(2)}
        </div>
        <div className="col-lg-2 col-sm-12 text-lg-right">
          {(parseFloat(itemQty) * parseFloat(itemRate)).toFixed(2)}
        </div>
        <div className="col-lg-1 col-6 text-lg-center">
          <button
            type="button"
            className="btn btn-success btn-sm"
            title="Edit"
            data-toggle="tooltip"
            onClick={() => handleEdit(id)}
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
            onClick={() => handleDelete(id)}
          >
            <MdDelete />
          </button>
        </div>
      </div>
    </li>
  );
};

export default InvoiceItem;
