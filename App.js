import { AppProvider } from "./AppContext";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./pages/HomeScreen";
import CreateEntryScreen from "./pages/CreateEntryScreen";
import SalesScreen from "./pages/SalesScreen";
import ExpensesScreen from "./pages/ExpensesScreen";
import "react-native-gesture-handler";

export default function App() {

  const Tab = createBottomTabNavigator();

  return (
    <AppProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Create" component={CreateEntryScreen} />
          <Tab.Screen name="Sales" component={SalesScreen} />
          <Tab.Screen name="Expenses" component={ExpensesScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
