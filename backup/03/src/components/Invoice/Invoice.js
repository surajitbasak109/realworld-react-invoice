import React, { Component } from "react";
import { randomNumber } from "./utils/basic_helper";
import FormHeading from "./FormHeading";
import FormLineItems from "./FormLineItems";
import uuidv4 from "uuid/v4";

class Invoice extends Component {
  locale = "en-IN";
  currency = "INR";

  state = {
    billNo: randomNumber(),
    billDate: "",
    customerName: "",
    mobileNo: "",
    taxRate: 0.0,
    lineItems: [
      {
        id: "initial",
        name: "",
        unit: "",
        quantity: 0,
        rate: 0.0,
        amount: 0.0
      }
    ],
    items: []
  };

  onChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  onLineItemChange = index => e => {
    let lineItems = this.state.lineItems.map((item, i) => {
      if (i !== index) return item;
      return { ...item, [e.target.name]: e.target.value };
    });

    this.setState({ lineItems });
  };

  onNameChange = elementIndex => e => {
    let selectedItem = this.state.items.filter((item, i) => {
      return e.target.value === item.code;
    });

    let lineItems = this.state.lineItems.map((item, i) => {
      if (i !== elementIndex) return item;
      return {
        ...item,
        name: selectedItem[0].name,
        unit: selectedItem[0].unit,
        rate: selectedItem[0].price
      };
    });

    this.setState({ lineItems });
  };

  handleAddLineItem = e => {
    this.setState({
      lineItems: this.state.lineItems.concat({
        id: uuidv4(),
        name: "",
        unit: "",
        quantity: 0,
        rate: 0.0,
        amount: 0.0
      })
    });
  };

  handleRemoveLineItem = elementIndex => e => {
    if (this.state.lineItems.length === 1) return;
    this.setState({
      lineItems: this.state.lineItems.filter((item, i) => {
        return elementIndex !== i;
      })
    });
  };

  onFocus = e => {
    e.target.select();
  };

  UNSAFE_componentWillMount = () => {
    fetch("http://localhost:3006/items?_sort=name&_order=asc")
      .then(res => res.json())
      .then(data => {
        this.setState({
          items: data
        });
      });
  };

  render() {
    // console.log(this.state.items);
    return (
      <div className="invoice">
        <div className="card card-body">
          <FormHeading
            state={this.state}
            handleOnChange={this.onChange}
            handleOnFocus={this.onFocus}
          />
          <FormLineItems
            items={this.state.items}
            lineItems={this.state.lineItems}
            addHandler={this.handleAddLineItem}
            removeHandler={this.handleRemoveLineItem}
            handleLineItemChange={this.onLineItemChange}
            handleSelectChange={this.onNameChange}
            handleOnFocus={this.onFocus}
          />
        </div>
      </div>
    );
  }
}

export default Invoice;
