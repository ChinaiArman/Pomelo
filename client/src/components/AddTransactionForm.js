import React from "react";

function AddTransactionForm() {
  return (
    <form>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Item Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="amount">Amount (Cost)</label>
          <input
            required
            type="text"
            className="form-control"
            id="amount"
          ></input>
        </div>
        <div className="col-sm d-flex align-items-end">
          <button type="submit" className="btn btn-primary">
            Add Transaction
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddTransactionForm;
