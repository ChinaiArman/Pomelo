import React from "react";
import TransactionItem from "./TransactionItem";

function TransactionList() {
  const transactions = [
    {
      transactionId: "TRANS1",
      transactionName: "Starbucks Tea",
      userId: "U1",
      amount: 2.8,
      categoryId: "C1",
      date: "03-13-2024",
    },
    {
      transactionId: "TRANS2",
      transactionName: "Pizza",
      userId: "U1",
      amount: 21.3,
      categoryId: "C1",
      date: "03-13-2024",
    },
    {
      transactionId: "TRANS3",
      transactionName: "Tickets",
      userId: "U2",
      amount: 10.0,
      categoryId: "C2",
      date: "03-13-2024",
    },
  ];

  return (
    <ul class="list-group mt-3  mb-3">
      {transactions.map((transaction) => (
        <TransactionItem
          id={transaction.transactionId}
          name={transaction.transactionName}
          amount={transaction.amount}
        />
      ))}
    </ul>
  );
}

export default TransactionList;
