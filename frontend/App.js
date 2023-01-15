import { StatusBar } from 'expo-status-bar';
import { Button, ScrollView, StyleSheet, Text, Image, TextInput, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.appContainer}>

    <Image source={require('./ExitButton.png')} 
     style={{width: 200, height: 100}} />

      <View style={styles.centerExitBoxContainer}>
        <View style={styles.exitBox}></View>
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

    
  );
}

const styles = StyleSheet.create({
  appContainer:{
    padding: 1,
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
