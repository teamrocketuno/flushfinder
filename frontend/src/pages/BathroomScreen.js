import { ImageBackground, View, Image, Text, Button, StyleSheet, TextInput } from "react-native";

const background = '../../assets/backgrounds/bg1.png';
const poopEmoji = '../../PoopEmoji.png';

export function BathroomScreen({ navigation }) {
  return (
    <ImageBackground source={require(background)} style={styles.backgroundImage} resizeMode='repeat'>
      <View style={styles.appContainer}>

        <View style={styles.invisibleBlock}></View>

        <View style={styles.likesContainer}>
          <Image source={require(poopEmoji)}
            style={{ width: 25, height: 25 }} />
          <Text style={{ fontSize: 20 }}>numLikes</Text>
        </View>

        <View style={styles.genInfoContainer}>
          <Text style={styles.genInfoLeftSpaceContainer}>Chung Hall Bathroom</Text>
          <Text style={styles.genInfoRightSpaceContainer}>0.2 mi</Text>
        </View>
        <View style={styles.genInfoContainer}>
          <Text style={styles.genInfoLeftSpaceContainer}>Star Rating</Text>
          <Text style={styles.genInfoRightSpaceContainer}>Open</Text>
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
    borderWidth: '1',
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
    alignItems: 'left',
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
