import React, { useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./pages/HomeScreen";
import CreateEntryScreen from "./pages/CreateEntryScreen";
import SalesScreen from "./pages/SalesScreen";
import ExpensesScreen from "./pages/ExpensesScreen";
import "react-native-gesture-handler";
import { salesData, expensesData } from "./data.js";

export default function App() {
  [salesEntries, setSalesEntries] = useState(salesData);
  [expensesEntries, setExpensesEntries] = useState(expensesData);

  const Tab = createBottomTabNavigator();

  const addSalesEntry = (newEntry) => {
    setSalesEntries([...salesEntries, newEntry]);
  };

  const addExpensesEntry = (newEntry) => {
    setExpensesEntries([...expensesEntries, newEntry]);
  };

  const deleteSalesEntry = (id) => {
    const updatedSalesEntries = salesEntries.filter((entry) => entry.id !== id);
    setSalesEntries(updatedSalesEntries);
  };

  const deleteExpensesEntry = (id) => {};
    const updatedExpensesEntries = expensesEntries.filter((entry) => entry.id !== id);
    setExpensesEntries(updatedExpensesEntries);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen
          name="Create"
          component={CreateEntryScreen}
          salesEntries={salesEntries}
          expensesEntries={expensesEntries}
          updateSalesEntries={addSalesEntry}
          updateExpensesEntries={addExpensesEntry}
        />
        <Tab.Screen
          name="Sales"
          component={SalesScreen}
          salesEntries={salesEntries}
          deleteEntry={deleteSalesEntry}
        />
        <Tab.Screen
          name="Expenses"
          component={ExpensesScreen}
          expensesEntries={expensesEntries}
          deleteEntry={deleteExpensesEntry}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
