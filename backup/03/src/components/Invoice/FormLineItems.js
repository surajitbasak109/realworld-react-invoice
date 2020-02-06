import React, { Component } from "react";

class FormLineItems extends Component {
  render() {
    const {
      lineItems,
      items,
      addHandler,
      removeHandler,
      handleSelectChange
    } = this.props;
    const nameOpts = items.map((item, i) => (
      <option index={i} key={i} value={item.code}>
        {item.name}
      </option>
    ));
    const lineItem = lineItems.map((item, i) => (
      <tr key={item.id} index={i}>
        <td>{i + 1}</td>
        <td>
          <select
            name="name"
            id="name"
            onChange={handleSelectChange(i)}
            className="form-control"
          >
            <option value="">Select Item</option>
            {nameOpts}
          </select>
        </td>
        <td>
          <input
            name="unit"
            type="text"
            value={item.unit}
            onChange={this.props.handleLineItemChange(i)}
            onFocus={this.props.handleOnFocus}
            className="form-control"
          />
        </td>
        <td>
          <input
            name="quantity"
            type="text"
            value={item.quantity}
            onChange={this.props.handleLineItemChange(i)}
            onFocus={this.props.handleOnFocus}
            className="form-control text-right"
          />
        </td>
        <td>
          <input
            name="rate"
            type="text"
            value={item.rate}
            onChange={this.props.handleLineItemChange(i)}
            onFocus={this.props.handleOnFocus}
            className="form-control text-right"
          />
        </td>
        <td>
          <input
            name="amount"
            type="text"
            value={item.amount}
            onChange={this.props.handleLineItemChange(i)}
            onFocus={this.props.handleOnFocus}
            className="form-control text-right"
          />
        </td>
        <td>
          <button
            onClick={removeHandler(i)}
            type="button"
            className="btn btn-flat btn-danger"
          >
            <i className="fa fa-trash"></i>
          </button>
        </td>
      </tr>
    ));
    return (
      <div className="form-items">
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th
                  style={{
                    width: "30%"
                  }}
                >
                  Item
                </th>
                <th
                  style={{
                    width: "15%"
                  }}
                >
                  Unit
                </th>
                <th
                  style={{
                    width: "15%"
                  }}
                >
                  Quantity
                </th>
                <th
                  style={{
                    width: "15%"
                  }}
                >
                  Price
                </th>
                <th
                  style={{
                    width: "20%"
                  }}
                >
                  Amount
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>{lineItem}</tbody>
          </table>
        </div>
        <div className="addItem text-right">
          <button
            onClick={addHandler}
            type="button"
            className="btn btn-outline-primary btn-flat"
          >
            <i className="fa fa-plus-circle" aria-hidden="true"></i> Add
          </button>
        </div>
      </div>
    );
  }
}

export default FormLineItems;
