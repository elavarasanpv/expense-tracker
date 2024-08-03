/** @format */

import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

//initial State
const initialState = {
  transactions: [],
  name: "",
  month: "",
};

//create context

export const GlobalContext = createContext(initialState);

//Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //actions
  function deleteTransaction(id) {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  }

  function addTransaction(transaction) {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  }
  function addName(name) {
    dispatch({
      type: "ADD_NAME",
      payload: name,
    });
  }
  function addMonth(month) {
    dispatch({
      type: "ADD_MONTH",
      payload: month,
    });
  }
  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
        addName,
        addMonth,
        name: state.name,
        month: state.month,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
