import "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeScreen from "@/components/screen/home";
import CartScreen from "@/components/screen/cart";
import MyClassScreen from "@/components/screen/myclass";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppHeader from "../../components/navigation/app.header";

type RootStackParamList = {
  Home: undefined;
  MyClass: undefined;
  Cart: { cartItems: any[] }; 
};

export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: '#50C2C9',
          }}}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ header: () => <AppHeader /> }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ header: () => <AppHeader /> }}
        />
        <Stack.Screen
          name="MyClass"
          component={MyClassScreen}
          options={{ header: () => <AppHeader /> }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
}
export type { RootStackParamList };
