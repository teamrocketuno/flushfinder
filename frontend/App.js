import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableLatestRenderer } from 'react-native-maps';

// Screens
import { MapScreen } from './src/pages/MapScreen'
import { BathroomScreen } from './src/pages/BathroomScreen'
import { AddBathroomScreen } from './src/pages/AddBathroomScreen';

const Stack = createNativeStackNavigator();
enableLatestRenderer();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Map" component={MapScreen} options={{headerShown: false}} />
        <Stack.Screen name="Bathroom" component={BathroomScreen} options={{headerShown: false}} />
        <Stack.Screen name="AddBathroom" component={AddBathroomScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
