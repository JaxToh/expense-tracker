import React, { createContext, useReducer } from "react";
import { salesData, expensesData } from "./data";

const initialState = {
  salesEntries: salesData,
  expensesEntries: expensesData,
};

const appReducer = (state, action) => {
  switch (action.type) {
    case "ADD_SALES_ENTRY":
      return {
        ...state,
        salesEntries: [...state.salesEntries, action.payload],
      };
    case "ADD_EXPENSES_ENTRY":
      return {
        ...state,
        expensesEntries: [...state.expensesEntries, action.payload],
      };
    case "DELETE_SALES_ENTRY":
      const updatedSalesEntries = state.salesEntries.filter(
        (entry) => entry.id !== action.payload.id
      );
      return {
        ...state,
        salesEntries: updatedSalesEntries,
      };
    case "DELETE_EXPENSES_ENTRY":
      const updatedExpensesEntries = state.expensesEntries.filter(
        (entry) => entry.id !== action.payload.id
      );
      return {
        ...state,
        expensesEntries: updatedExpensesEntries,
      };
    default:
      return state;
  }
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };