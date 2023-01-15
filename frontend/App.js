import { StatusBar } from 'expo-status-bar';
import { Button, ScrollView, StyleSheet, Text, Image, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function MapScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Map Screen</Text>
      <Button
        title="View Bathroom"
        onPress={() => navigation.navigate('Bathroom')}
      />
      <Button
        title="Add Bathroom"
        onPress={() => navigation.navigate('AddBathroom')}
      />
    </View>
  );
}

function BathroomScreen({ navigation }) {
  return (
    <View style={styles.appContainer}>

        <View style={styles.invisibleBlock}></View>

        <View style={styles.likesContainer}>
            <Image source={require('./PoopEmoji.png')}
              style={{ width: 25, height: 25 }} />
            <Text style={{fontSize: 20}}>numLikes</Text>
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

function AddBathroomScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Add a New Bathroom</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Bathroom" component={BathroomScreen} />
        <Stack.Screen name="AddBathroom" component={AddBathroomScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  appContainer:{
    padding: 1,
  },
  invisibleBlock:{
    marginTop: 20,
  },
  likesContainer: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 50,
    flexDirection: 'row',
  },
  genInfoContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genInfoLeftSpaceContainer:{
    marginTop: 1,
    marginLeft: 50,
    marginBottom: 10,
    fontSize: 20,
  },
  genInfoRightSpaceContainer:{
    marginTop: 1,
    marginRight: 50,
    marginBottom: 10,
    fontSize: 20,
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
    fontSize: 20,
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
    fontSize: 20,
  },
 
});
