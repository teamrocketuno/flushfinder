import { FloatingAction } from "react-native-floating-action";
import MapView from 'react-native-maps';
import { View, Button, Text, StyleSheet, Platform, Image, Dimensions } from 'react-native';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const actions = [
  {
    text: "Add Bathroom",
    icon: <Image source={require("../../Images/JohnLou.jpg")} style={{ width: 25, height: 25 }} />,
    name: "bt_addbathroom",
    position: 1,
  },
  {
    text: "Options",
    icon: require("../../Images/JohnLou.jpg"),
    name: "bt_options",
    position: 2,
  },
];

const navmap = {
  'bt_options': 'Bathroom',
  'bt_addbathroom': 'AddBathroom'
}

export const MapScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'Righteous': require('../../assets/fonts/Righteous-Regular.ttf'),
    'PatuaOne': require('../../assets/fonts/PatuaOne-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <MapView style={styles.map} />
      <FloatingAction
        actions={actions}
        onPressItem={name => navigation.navigate(navmap[name])}
      />
      <Text style={styles.titleText}>FlushFinder</Text>
      <Button
        title="View Bathroom"
        onPress={() => navigation.navigate('Bathroom')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  map: {
    width: '100%',
    height: '100%',
    zIndex: -1
  },
  icon: {
    width: 10,
    height: 10
  },
    defaultText:{
      fontFamily: 'PatuaOne',
    },
    titleText:{
      fontFamily: 'Righteous',
      fontSize: 30,
    },
  });
