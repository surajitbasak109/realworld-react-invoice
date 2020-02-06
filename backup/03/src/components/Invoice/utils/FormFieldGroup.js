import React from "react";
import PropTypes from "prop-types";

function FormFieldGroup(props) {
  const {
    label,
    id,
    type,
    name,
    value,
    placeholder,
    error,
    onChange,
    onFocus
  } = props;
  return (
    <div className="form-group col-md-6 col-12">
      <div className="row">
        <label className="col-sm-3 col-form-label" htmlFor={id}>
          {label}
        </label>
        <div className="col-sm-9">
          <input
            name={name}
            id={id}
            type={type}
            value={value}
            className="form-control"
            placeholder={placeholder}
            onChange={onChange}
            onFocus={onFocus}
          />
        </div>
      </div>
      <div className="invalid-feedback">{error ? error : ""}</div>
    </div>
  );
}

FormFieldGroup.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired
};

export default FormFieldGroup;
