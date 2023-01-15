import { FloatingAction } from "react-native-floating-action";
import MapView from 'react-native-maps';
import { View, Button, Text, StyleSheet, Platform, Image, Dimensions } from 'react-native';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { ToiletMap } from "../components/ToiletMap";

SplashScreen.preventAutoHideAsync();

const actions = [
  {
    text: "Add Bathroom",
    icon: <Image source={require("../../Images/JohnLou.png")} style={{ width: 30, height: 30 }} />,
    name: "bt_addbathroom",
    position: 1,
  },
  /*
  {
    text: "Options",
    icon: <Image source={require("../../Images/JohnLou.png")} style={{ width: 30, height: 30 }} />,
    name: "bt_options",
    position: 2,
  },
  */
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
      <Text style={styles.titleText}>FlushFinder</Text>
      <ToiletMap style={styles.map} navigation={navigation} />
      <FloatingAction
        actions={actions}
        onPressItem={name => navigation.navigate(navmap[name])}
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
  icon: {
    width: 10,
    height: 10
  },
  defaultText:{
    fontFamily: 'PatuaOne',
  },
  titleText:{
    position: 'absolute',
    top: '6%',
    fontFamily: 'Righteous',
    fontSize: 30,
  },
  });
