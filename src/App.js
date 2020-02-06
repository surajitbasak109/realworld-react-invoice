import React from "react";
import "./App.css";
import uuid from "uuid/v4";

// components
import Alert from "./components/Alert";
import InvoiceForm from "./components/InvoiceForm";
import InvoiceList from "./components/InvoiceList";
import InvoiceSummary from "./components/InvoiceSummary";

const initialInvoiceItems = localStorage.getItem("invoiceItems")
  ? JSON.parse(localStorage.getItem("invoiceItems"))
  : [];

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
      initialInvoiceItems: initialInvoiceItems,
      edit: false,
      alert: {
        show: false,
        type: "",
        text: ""
      }
    };
    this.clearItems = this.clearItems.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
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
      id,
      itemCode,
      itemName,
      itemUnit,
      itemRate,
      itemQty,
      itemAmount,
      edit,
      initialInvoiceItems
    } = this.state;

    if (itemName !== "" && parseInt(itemQty) > 0) {
      if (edit) {
        let tempInvoiceItem = initialInvoiceItems.map(item =>
          item.id === id
            ? {
                ...item,
                itemCode,
                itemName,
                itemUnit,
                itemRate,
                itemQty,
                itemAmount
              }
            : item
        );
        this.setState({ initialInvoiceItems: tempInvoiceItem, edit: false });
        this.handleAlert({ type: "success", text: "Item updated!" });
      } else {
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
        this.handleAlert({ type: "success", text: "Item added." });
      }

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
      this.handleAlert({
        type: "danger",
        text:
          "Item name should not be empty or item quantity should be bigger than zero."
      });
    }
  }

  handleDelete(id) {
    let tempInvoiceItems = this.state.initialInvoiceItems.filter(
      item => item.id !== id
    );
    this.setState({
      initialInvoiceItems: tempInvoiceItems
    });

    this.handleAlert({ type: "success", text: "Item deleted" });
  }

  handleEdit(id) {
    let invoiceItem = this.state.initialInvoiceItems.find(
      item => item.id === id
    );
    let { itemName, itemCode, itemUnit, itemQty, itemRate } = invoiceItem;
    let itemAmount = (parseInt(itemQty) * parseFloat(itemRate)).toFixed(2);
    this.setState({
      id,
      itemName,
      itemCode,
      itemUnit,
      itemQty,
      itemRate,
      itemAmount
    });
    document.querySelector("#itemName").focus();
    this.setState({ edit: true });
  }

  clearItems() {
    this.setState({
      initialInvoiceItems: []
    });
    this.handleAlert({ type: "success", text: "Items cleared." });
  }

  handleAlert({ type, text }) {
    this.setState({
      alert: { show: true, type, text }
    });

    setTimeout(() => {
      this.setState({ alert: { show: false } });
    }, 3000);
  }

  componentDidMount() {
    window.$('[data-toggle="tooltip"]').tooltip();
    this.uiAutocomplete(this);
  }

  componentWillUnmount() {
    window.$('[data-toggle="tooltip"]').tooltip("destroy");
    window.$("#itemName").autocomplete("destroy");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps);
    localStorage.setItem(
      "invoiceItems",
      JSON.stringify(prevState.initialInvoiceItems)
    );
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextState.itemAmount !== "0.00";
  // }

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
    const {
      itemName,
      itemCode,
      itemUnit,
      itemQty,
      itemRate,
      itemAmount,
      alert,
      initialInvoiceItems,
      edit
    } = this.state;
    return (
      <div className="App">
        {alert.show && <Alert type={alert.type} text={alert.text} />}
        <h1 className="text-center h2">React Invoice Tutorial</h1>
        <InvoiceForm
          itemCode={itemCode}
          itemName={itemName}
          itemUnit={itemUnit}
          itemQty={itemQty}
          itemRate={itemRate}
          itemAmount={itemAmount}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          edit={edit}
        />
        <InvoiceList
          invoiceItems={initialInvoiceItems}
          clearItems={this.clearItems}
          handleDelete={this.handleDelete}
          handleEdit={this.handleEdit}
        />
        <InvoiceSummary invoiceItems={initialInvoiceItems} />
      </div>
    );
  }
}

export default App;
