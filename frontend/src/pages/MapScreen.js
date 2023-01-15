import { View, StyleSheet, Image } from 'react-native';
import { FloatingAction } from "react-native-floating-action";
import MapView from 'react-native-maps';

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
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
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
  map: {
    width: '100%',
    height: '100%',
    zIndex: -1
  },
  icon: {
    width: 10,
    height: 10
  },
});
