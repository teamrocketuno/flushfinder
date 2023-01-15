import { ImageBackground, View, Image, Text, Button, StyleSheet, TextInput  } from 'react-native';

const background = '../../assets/backgrounds/bg1.png';
const poopEmoji = '../../PoopEmoji.png';

export const AddBathroomScreen = ({ navigation }) => {
  return (
    <ImageBackground source={require(background)} style={styles.backgroundImage} resizeMode='repeat'>
      <View style={styles.appContainer}>
        
        <TextInput style={styles.nameInput} placeholder="Bathroom Name..." />
        
        <View style={styles.centerSpacingContainer}>
          <Button
            title="Submit"
            onPress={() => navigation.navigate('Bathroom')}
          />
        </View>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage:{
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  appContainer:{
    backgroundColor: 'white',
    borderRadius: 20,
    margin: '8%',
    opacity: 1,
    shadowColor: "#000",
    shadowColor: 'white',

    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 2.8,
    shadowRadius: 6.27,
    
    elevation: 10,
  },
  centerSpacingContainer:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameInput:{
    borderWidth: 1,
    borderColor: 'black',
    width: '70%',
    marginLeft: 50,
    padding: 8,
    marginBottom: 10,
    marginTop: 10,
  },
});