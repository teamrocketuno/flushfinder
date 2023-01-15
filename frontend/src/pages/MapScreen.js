import { View, Button, Text, StyleSheet, Platform, Image, Dimensions } from 'react-native';

let {height, width} = Dimensions.get('window')

export const MapScreen = ({ navigation }) => {
  return (
    <View style={styles.MainContainer}>
      <Text>Map Screen</Text>
      <Button
        title="View Bathroom"
        onPress={() => navigation.navigate('Bathroom')}
      />

        <View style = {styles.nextBottomView}>

          <Button
          title="Add Bathroom"
          onPress={() => navigation.navigate('AddBathroom')}
          />
        </View>

        <View style = {styles.bottomView}>
          <Button
          title="Current Location(NOT WORKING)"
          onPress={() => navigation.navigate('AddBathroom')}
          />
        </View>
    </View>
  );
}

const styles = StyleSheet.create(
  {
    MainContainer:
    {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    image: 
    {
      marginTop: 50
    },

    nextBottomView:
    {
      width: ((height*width)/(height+width))/2,
      height: ((height*width)/(height+width))/5,
      backgroundColor: '#add8e6',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: (height/12) + 8
    },

    bottomView: 
    {
      width: '100%',
      height: height/12,
      backgroundColor: '#dda0dd',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0
    },

  });