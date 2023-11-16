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
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused
                  ? "ios-information-circle"
                  : "ios-information-circle-outline";
              } else if (route.name === "Settings") {
                iconName = focused ? "ios-list" : "ios-list-outline";
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Create" component={CreateEntryScreen} />
          <Tab.Screen name="Sales" component={SalesScreen} />
          <Tab.Screen name="Expenses" component={ExpensesScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
