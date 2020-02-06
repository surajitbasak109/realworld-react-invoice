import React from "react";
import { MdSend } from "react-icons/md";

const InvoiceForm = ({
  itemCode,
  itemName,
  itemUnit,
  itemQty,
  itemRate,
  itemAmount,
  handleChange,
  handleSubmit
}) => {
  const selectValue = e => {
    e.target.select();
  };
  return (
    <div className="container">
      <form className="form-row" autoComplete="off" onSubmit={handleSubmit}>
        <div className="col-lg-1">
          <div className="form-group">
            <label htmlFor="code">Code</label>
            <input
              type="text"
              name="itemCode"
              id="itemCode"
              value={itemCode}
              onChange={handleChange}
              className="form-control"
              readOnly
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="itemName"
              id="itemName"
              value={itemName}
              onChange={evt => handleChange(evt)}
              className="form-control"
              autoFocus
            />
          </div>
        </div>
        <div className="col-lg-1">
          <div className="form-group">
            <label htmlFor="unit">Unit</label>
            <input
              type="text"
              name="itemUnit"
              id="itemUnit"
              value={itemUnit}
              onChange={handleChange}
              className="form-control"
              readOnly
            />
          </div>
        </div>
        <div className="col-lg-1">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            name="itemQty"
            id="itemQty"
            value={itemQty}
            onChange={handleChange}
            className="form-control text-right"
            onFocus={selectValue}
          />
        </div>
        <div className="col-lg-1">
          <label htmlFor="rate">Rate</label>
          <input
            type="text"
            name="itemRate"
            id="itemRate"
            value={itemRate}
            onChange={handleChange}
            className="form-control text-right"
            readOnly
          />
        </div>
        <div className="col-lg-2">
          <label htmlFor="rate">Amount</label>
          <input
            type="text"
            name="itemAmount"
            id="itemAmount"
            value={itemAmount}
            onChange={evt => handleChange(evt)}
            className="form-control text-right"
            readOnly
          />
        </div>
        <div className="col-lg-2" style={{ paddingTop: "31px" }}>
          <button type="submit" className="btn btn-primary btn-block">
            Submit <MdSend />
          </button>
        </div>
      </form>
    </div>
  );
};

export default InvoiceForm;
