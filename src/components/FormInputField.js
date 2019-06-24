import React from "react";

export default ({ name, input, label, meta: { error, touched }, type }) => {
  return (
    <div className="form-group">
      <fieldset>
        <label htmlFor={name}>{label}</label>
        <input
          {...input}
          type={type}
          style={{ marginBottom: "5px" }}
          className="form-control"
        />
      </fieldset>
      <div className="error red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};
