import React, { Component } from "react";
import FormFieldGroup from "./utils/FormFieldGroup";

class FormHeading extends Component {
  render() {
    const { billNo, billDate, customerName, mobileNo } = this.props.state;
    return (
      <div className="form-heading">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="form-row">
                <FormFieldGroup
                  name="billNo"
                  id="billNo"
                  type="text"
                  label="Bill No."
                  value={billNo}
                  error={this.props.error}
                  placeholder="Enter Bill no"
                  onChange={this.props.handleOnChange}
                  onFocus={this.props.handleOnFocus}
                />

                <FormFieldGroup
                  name="billDate"
                  id="bill_date"
                  type="date"
                  label="Bill Date"
                  value={billDate}
                  error={this.props.error}
                  placeholder="Enter Bill Date"
                  onChange={this.props.handleOnChange}
                  onFocus={this.props.handleOnFocus}
                />

                <FormFieldGroup
                  name="customerName"
                  id="customer_name"
                  type="text"
                  label="Customer name"
                  value={customerName}
                  error={this.props.error}
                  placeholder="Enter Customer name"
                  onChange={this.props.handleOnChange}
                  onFocus={this.props.handleOnFocus}
                />

                <FormFieldGroup
                  name="mobileNo"
                  id="mobile_no"
                  type="text"
                  label="Mobile No"
                  value={mobileNo}
                  error={this.props.error}
                  placeholder="Enter Mobile no"
                  onChange={this.props.handleOnChange}
                  onFocus={this.props.handleOnFocus}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FormHeading;
