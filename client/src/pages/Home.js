import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Budget from "../components/Budget";
import Remaining from "../components/Remaining";
import ExpenseTotal from "../components/ExpenseTotal";
import TransactionList from "../components/TransactionList";
import AddTransactionForm from "../components/AddTransactionForm";

const Home = () => {
  return (
    <div className="container">
      <h1 className="mt-3">Team Space Name</h1>
      <div className="row mt-3">
        <div className="col-sm">
          <Budget />
        </div>
        <div className="col-sm">
          <Remaining />
        </div>
        <div className="col-sm">
          <ExpenseTotal />
        </div>
      </div>
      <h3 className="mt-3">Transactions</h3>
      <div className="row mt-3">
        <div className="col-sm">
          <TransactionList />
        </div>
      </div>
      <h3 className="mt-3">Add Transaction</h3>
      <div className="mt-3">
        <div className="col-sm">
          <AddTransactionForm />
        </div>
      </div>
    </div>
  );
};

export default Home;
