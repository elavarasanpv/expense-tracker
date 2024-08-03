/** @format */

import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Transaction } from "./Transaction";
export const TransactionList = () => {
  const context = useContext(GlobalContext);
  return (
    <>
      <ul id="list" className="list mobile-only">
        {context.transactions.map((transaction) => (
          <Transaction transaction={transaction} key={transaction.id} />
        ))}
      </ul>
    </>
  );
};
