/** @format */

import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
export const Balance = () => {
  const context = useContext(GlobalContext);
  const amounts = context.transactions.map((tranc) => tranc.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  return (
    <>
      <h4>Your Saving</h4>
      <h1 id="balance">{total}</h1>
    </>
  );
};
