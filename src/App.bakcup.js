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
    code: "2050",
    name: "Tandoory Chicken",
    unit: "Pcs",
    quantity: 5,
    rate: 110,
    amount: 550
  },
  {
    id: uuid(),
    code: "2099",
    name: "Chicken Lollipop",
    unit: "Pcs",
    quantity: 4,
    rate: 50,
    amount: 200
  }
];

function App() {
  // *************************** state values ***************************

  // all invoices, add invoice item
  const [invoiceItems, setInvoiceItem] = useState(initialInvoiceItems);
  // single item name
  const [itemName, setItemName] = useState("");
  // single item code
  const [itemCode, setItemCode] = useState("");
  // single item unit
  const [itemUnit, setItemUnit] = useState("");
  // single item quantity
  const [itemQty, setItemQty] = useState("0");
  // single item rate
  const [itemRate, setItemRate] = useState("0.00");
  // single item amount
  const [itemAmount, setItemAmount] = useState("0.00");
  // edit item
  const [id, setId] = useState("");

  // ************************** functionality ***************************
  // handle name
  const handleName = e => setItemName(e.target.value);
  // handle code
  const handleCode = e => setItemCode(e.target.value);
  // handle unit
  const handleUnit = e => setItemUnit(e.target.value);
  // handle quantity
  const handleQty = e => setItemQty(e.target.value);
  // handle rate
  const handleRate = e => setItemRate(e.target.value);
  // handle amount
  const handleAmount = e => setItemAmount(e.target.value);

  const clearItems = () => {
    setInvoiceItem([]);
  };
  return (
    <div className="App">
      <Alert />
      <h1 className="text-center">Invoice App</h1>
      <InvoiceForm
        itemCode={itemCode}
        itemName={itemName}
        itemUnit={itemUnit}
        itemQty={itemQty}
        itemRate={itemRate}
        itemAmount={itemAmount}
        handleName={handleName}
        handleCode={handleCode}
        handleUnit={handleUnit}
        handleQty={handleQty}
        handleRate={handleRate}
        handleAmount={handleAmount}
      />
      <InvoiceList invoiceItems={invoiceItems} clearItems={clearItems} />
    </div>
  );
}

export default App;
