import { useState } from 'react';
import { ImageBackground, View, Image, Text, Button, StyleSheet, TextInput, Dimensions  } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const background = '../../assets/backgrounds/bg3.png';
const poopEmoji = '../../PoopEmoji.png';

const URL = 'http://172.104.196.152/';
const MIN_TOILET_NAME = 3;
const MAX_TOILET_NAME = 30;

let {height, width} = Dimensions.get('window')

export const AddBathroomScreen = ({ navigation }) => {
  const [currentText, setCurrentText] = useState('');
  const [region, setRegion] = useState({latitude: 0, longitude: 0})

  function createThenNavigate() {
    if (currentText.length <= MIN_TOILET_NAME || currentText.length >= MAX_TOILET_NAME) return; // Do nothing if no name

    var details = {
      'name': currentText,
      'latitude': region.latitude,
      'longitude': region.longitude
    };
    
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    
    fetch(URL + 'create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    })
      .then(response => response.json())
        .then(json => {
          navigation.replace('Bathroom', {marker: json.toilet})
        })
      .catch(err => console.error(err))
  }

  return (
    <ImageBackground source={require(background)} style={styles.backgroundImage} resizeMode='repeat'>
      <View style={styles.appContainer}>
        
        <TextInput style={styles.nameInput} placeholder="Bathroom Name..." onChangeText={(text) => setCurrentText(text)}/>

        <MapSelector changeRegionFunc={setRegion}/>
        
        <View style={styles.centerSpacingContainer}>
          <Button
            title="Submit"
            onPress={() => createThenNavigate()}
          />
        </View>

      </View>
    </ImageBackground>
  );
}

const MapSelector = (props) => {
  const [region, setRegion] = useState({latitude: 0, longitude: 0})

  function updateCenter(region) {
    setRegion(region);
    props.changeRegionFunc(region)
  }

  return (
    <MapView style={styles.mapSelector} onRegionChange={(region) => updateCenter(region)} showsUserLocation={true} >
      <Marker coordinate={region} key={0} />
    </MapView>
  )
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
    shadowColor: 'black',

    shadowOffset: {
      width: [width]/50,
      height: [height]/50,
    },
    shadowOpacity: .5,
    shadowRadius: 0,
    
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
    marginTop: 100,
    marginLeft: 50,
    padding: 8,
    marginBottom: 10,
    marginTop: 10,
  },
  mapSelector: {
    alignSelf: 'center',
    width: '90%',
    height: '60%',
    marginTop: '5%',
    marginBottom: '5%'
  }
});