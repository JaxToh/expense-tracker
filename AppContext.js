import React, { createContext, useReducer, useEffect } from "react";
import { salesData, expensesData } from "./data";

const initialState = {
  salesEntries: salesData,
  expensesEntries: expensesData,
  totalSales: 0,
  totalExpenses: 0,
};

const appReducer = (state, action) => {
  switch (action.type) {
    case "ADD_SALES_ENTRY":
      return {
        ...state,
        salesEntries: [...state.salesEntries, action.payload.newEntry],
      };
    case "ADD_EXPENSES_ENTRY":
      return {
        ...state,
        expensesEntries: [...state.expensesEntries, action.payload.newEntry],
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
    case "CALCULATE_TOTAL_AMOUNTS":
      return {
        ...state,
        totalExpenses: action.payload.totalExpenses,
        totalSales: action.payload.totalSales,
      };
    default:
      return state;
  }
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    calculateTotalAmounts();
  }, []);

  useEffect(() => {
    calculateTotalAmounts();
  }, [state.salesEntries, state.expensesEntries]);

  const calculateTotalAmounts = () => {
    const totalExpenses = state.expensesEntries.reduce(
      (total, entry) => total + parseFloat(entry.amount),
      0
    );
    const totalSales = state.salesEntries.reduce(
      (total, entry) => total + parseFloat(entry.amount),
      0
    );

    dispatch({
      type: "CALCULATE_TOTAL_AMOUNTS",
      payload: { totalExpenses, totalSales },
    });
  };

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
