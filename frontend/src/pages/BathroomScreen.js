import { ImageBackground, View, Image, Text, Button, StyleSheet, TextInput, Dimensions } from "react-native";
import MapView from 'react-native-maps';

const background = '../../assets/backgrounds/bg1.png';
const poopEmoji = '../../Images/Goldenpoo.png';

let {height, width} = Dimensions.get('window')

export function BathroomScreen({ navigation, route }) {
  const {marker} = route.params;

  function calcAverageRating(ratings) {
    if (ratings.length == 0) return 'Unrated'
    let amount = 0;
    let result = 0;
    ratings.forEach(element => {
      result += element.rating;
      amount++;
    });
    return result / amount;
  }
  
  return (
    <ImageBackground source={require(background)} style={styles.backgroundImage} resizeMode='repeat'>
      <View style={styles.appContainer}>

        <View style={styles.invisibleBlock}></View>

        <View style={styles.likesContainer}>
          <Image source={require(poopEmoji)}
            style={{ width: [width]/10, height: [width]/10 }} />
          <Text style={{ fontFamily: 'PatuaOne', fontSize: 20 }}>{marker.likes.length}</Text>
        </View>

        <View style={styles.genInfoContainer}>
          <Text style={styles.genInfoLeftSpaceContainer}>{marker.name}</Text>
          <Text style={styles.genInfoRightSpaceContainer}>0.2 mi</Text>
        </View>
        <View style={styles.genInfoContainer}>
          <Text style={styles.genInfoLeftSpaceContainer}>{calcAverageRating(marker.ratings)} / 5</Text>
          <Text style={styles.genInfoRightSpaceContainer}>{marker.open ? 'Open' : 'Closed'}</Text>
        </View>

        <View style={styles.centerContainer}>
          <Button title="Verify" />
        </View>

        <View style={styles.centerContainer}>
          <View style={styles.sectionBorder}></View>
        </View>

        <View style={styles.attributeSpacingContainer}>
          <Text style={styles.attributeListContainer}>Wheel-Chair Accessible</Text>
          <Text style={styles.attributeListContainer}>Gender Neutral</Text>
        </View>

        <View style={styles.centerContainer}>
          <View style={styles.sectionBorder}></View>
        </View>

        <View style={styles.commentTitleSpacing}>
          <Text style={styles.genInfoLeftSpaceContainer}>Comments</Text>
          <Text style={styles.genInfoRightSpaceContainer}>numComments</Text>
        </View>

        <View style={styles.commentTitleSpacing}>
          <TextInput style={styles.textInput} placeholder="Comment..." />
        </View>

        <View style={styles.commentTitleSpacing}>
          <Text style={styles.genInfoLeftSpaceContainer}>accountName</Text>
          <Text style={styles.genInfoRightSpaceContainer}>timeStamp</Text>
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
  textFont:{
    fontFamily: 'PatuaOne',
  },
  appContainer:{
    fontFamily: 'PatuaOne',
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
  exitBox: {
    width: 350,
    height: 50,
    borderColor: 'black',
    borderWidth: 2,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center,'
  },
  centerExitBoxContainer: {
    marginTop: 50,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  genInfoContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genInfoLeftSpaceContainer:{
    marginTop: 1,
    marginLeft: 50,
    marginBottom: 10,
  },
  genInfoRightSpaceContainer:{
    marginTop: 1,
    marginRight: 50,
    marginBottom: 10,
  },
  sectionBorder:{
    borderColor: 'black',
    borderWidth: 1,
    width: 300,
    marginTop: 10,
    marginBottom: 15,
  },
  centerContainer:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  attributeSpacingContainer:{
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  attributeListContainer:{
    marginTop: 1,
    marginBottom: 10,
  },
  commentTitleSpacing:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  textInput:{
    borderWidth: 1,
    borderColor: 'black',
    width: '70%',
    marginLeft: 50,
    padding: 8,
    marginBottom: 5,
  },
});
