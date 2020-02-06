import React, { useState } from "react";
import "./App.css";
import uuid from "uuid/v4";

// components
import Alert from "./components/Alert";
import InvoiceForm from "./components/InvoiceForm";
import InvoiceList from "./components/InvoiceList";

const initialInvoiceItems = [
  {
    id: uuid(),
    itemCode: "2050",
    itemName: "Tandoory Chicken",
    itemUnit: "Pcs",
    itemQty: 5,
    itemRate: 110,
    itemAmount: 550
  },
  {
    id: uuid(),
    itemCode: "2099",
    itemName: "Chicken Lollipop",
    itemUnit: "Pcs",
    itemQty: 4,
    itemRate: 50,
    itemAmount: 200
  },
  {
    id: uuid(),
    itemCode: "3659",
    itemName: "Chicken Lollipop TOKUODIF",
    itemUnit: "Pcs",
    itemQty: 4,
    itemRate: 50,
    itemAmount: 200
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemCode: "",
      itemName: "",
      itemUnit: "",
      itemQty: "0",
      itemRate: "0.00",
      itemAmount: "0.00",
      initialInvoiceItems: initialInvoiceItems
    };
    this.clearItems = this.clearItems.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    if (evt.target.name === "itemQty") {
      let qty = parseFloat(evt.target.value);
      if (!isNaN(qty)) {
        let rate = parseFloat(this.state.itemRate);
        let amount = (qty * rate).toFixed(2);
        this.setState({ itemAmount: amount });
      }
    }
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const {
      itemCode,
      itemName,
      itemUnit,
      itemRate,
      itemQty,
      itemAmount
    } = this.state;
    if (itemName !== "" && parseInt(itemQty) > 0) {
      const tempInvoiceItem = {
        id: uuid(),
        itemCode,
        itemName,
        itemUnit,
        itemRate,
        itemQty,
        itemAmount
      };
      this.setState({
        initialInvoiceItems: [
          ...this.state.initialInvoiceItems,
          tempInvoiceItem
        ]
      });
      this.setState({
        itemName: "",
        itemCode: "",
        itemUnit: "",
        itemQty: "0",
        itemRate: "0.00",
        itemAmount: "0.00"
      });
      document.querySelector("#itemName").focus();
    } else {
      console.log(
        "Error: Item name should not be empty or item quantity should be bigger than zero."
      );
    }
  }

  clearItems() {
    this.setState({
      initialInvoiceItems: []
    });
  }

  componentDidMount() {
    window.$('[data-toggle="tooltip"]').tooltip();
    this.uiAutocomplete(this);
  }

  componentWillUnmount() {
    window.$('[data-toggle="tooltip"]').tooltip("destroy");
    window.$("#itemName").autocomplete("destroy");
  }

  uiAutocomplete(that) {
    window.$("#itemName").autocomplete({
      autoFocus: true,
      source: function(request, response) {
        // Fetch data
        window.$.ajax({
          url: "http://localhost:3004/items",
          type: "GET",
          dataType: "json",
          data: {
            name_like: request.term
          },
          success: function(data) {
            response(
              data.map(item => {
                return {
                  label: item.name,
                  value: item.name,
                  data: item
                };
              })
            );
          }
        });
      },
      select: function(event, ui) {
        // Set selection
        that.setState({
          itemName: ui.item.label,
          itemCode: ui.item.data.code,
          itemUnit: ui.item.data.unit,
          itemRate: ui.item.data.rate,
          itemQty: 1,
          itemAmount: ui.item.data.rate
        });
        window.$("#itemQty").focus();
        return false;
      }
    });
  }

  render() {
    return (
      <div className="App">
        <InvoiceForm
          itemCode={this.state.itemCode}
          itemName={this.state.itemName}
          itemUnit={this.state.itemUnit}
          itemQty={this.state.itemQty}
          itemRate={this.state.itemRate}
          itemAmount={this.state.itemAmount}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <InvoiceList
          invoiceItems={this.state.initialInvoiceItems}
          clearItems={this.clearItems}
        />
      </div>
    );
  }
}

export default App;
