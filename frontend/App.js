import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import { MapScreen } from './src/pages/MapScreen'
import { BathroomScreen } from './src/pages/BathroomScreen'
import { AddBathroomScreen } from './src/pages/AddBathroomScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Bathroom" component={BathroomScreen} />
        <Stack.Screen name="AddBathroom" component={AddBathroomScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
