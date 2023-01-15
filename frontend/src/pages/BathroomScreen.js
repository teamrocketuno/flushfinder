import { useEffect, useState } from "react";
import { ImageBackground, View, Image, Text, Button, StyleSheet, TextInput, Dimensions, ScrollView } from "react-native";
import MapView from 'react-native-maps';
import { Component } from "react";

const background = '../../assets/backgrounds/bg3.png';
const poopEmoji = '../../Images/Goldenpoo.png';

const URL = 'http://172.104.196.152/';
const MIN_COMMENT_LEN = 1;
const MAX_COMMENT_LEN = 100;

let {height, width} = Dimensions.get('window')

export function BathroomScreen({ navigation, route }) {
  const [distance, setDistance] = useState('');
  const [comments, setComments] = useState([]);
  const [textInput, setTextInput] = useState(undefined);
  const {marker} = route.params;
  const [toilet, setToilet] = useState(marker)

  useEffect(() => {
    fetchComments().then((data) => {setComments(data)}).catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetchComments().then((data) => setComments(data)).catch((err) => console.log(err));
  }, [toilet])

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

  function uploadComment(text) {
    if (text.length <= MIN_COMMENT_LEN || text.length >= MAX_COMMENT_LEN) return; // Do nothing if no name

    var details = {
      'id': toilet.id,
      'comment': text,
    };
    
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    
    fetch(URL + 'comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    })
      .then(response => response.json())
        .then(json => {
          // Refresh comments
          textInput.clear();
          fetchData().then((data) => {
            setToilet(data);
          }).catch((err) => console.log(err));
        })
      .catch(err => console.error(err))
  }

  async function fetchComments() {
    try {
      let response = await fetch(URL + "data/comment?" + formatCommentIds())
      let json = await response.json();
      return json.data;
    } catch (error) {
      throw error;
    }
  }

  async function fetchData() {
    try {
      let response = await fetch(URL + "data/toilet/" + toilet.id)
      let json = await response.json();
      return json.data;
    } catch (error) {
      throw error;
    }
  }

  function formatCommentIds() {
    if (toilet.comments.length == 0) return '';
    let result = '';
    toilet.comments.forEach((id) => result = result + `id=${id}&`)
    return result;
  }
  
  return (
    <ImageBackground source={require(background)} style={styles.backgroundImage} resizeMode='repeat'>
      <ScrollView style={styles.appContainer}>

        <View style={styles.invisibleBlock}></View>

        <View style={styles.likesContainer}>
          <Image source={require(poopEmoji)}
            style={{ width: [width]/10, height: [width]/10 }} />
          <Text style={{ fontFamily: 'PatuaOne', fontSize: 20 }}>{toilet.likes.length}</Text>
        </View>

        <View style={styles.genInfoContainer}>
          <Text style={styles.genLeftTitleContainer}>{toilet.name}</Text>
          <Text style={styles.genInfoRightSpaceContainer}>{distance}</Text>
        </View>
        <View style={styles.genInfoContainer}>
          <Text style={styles.genInfoLeftSpaceContainer}>{calcAverageRating(toilet.ratings)} / 5</Text>
          <Text style={styles.genInfoRightSpaceContainer}>{toilet.open ? 'Open' : 'Closed'}</Text>
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
          <Text style={styles.genLeftCommentTitle}>Comments</Text>
          <Text style={styles.genInfoRightSpaceContainer}>{toilet.comments.length}</Text>
        </View>

        <View style={styles.commentTitleSpacing}>
          <TextInput style={styles.textInput} ref={input => { setTextInput(input) }} placeholder="Comment..." onSubmitEditing={(event) => uploadComment(event.nativeEvent.text)} />
        </View>

        <CommentComponent comments={comments} />
      </ScrollView>
    </ImageBackground>
  );
}

class CommentComponent extends Component {
  constructor(props) {
    super(props);
  }

  renderComments() {
    return this.props.comments.map((comment) => <Comment account={comment.user} time={comment.time} text={comment.text} />)
  }

  render() {
    return (this.renderComments());
  }
}

const ANONYMOUS_USER = '00000000-0000-0000-0000-000000000000'

const Comment = (props) => {

  function formatDate() {
    var t = new Date( props.time );
    return t.toLocaleString();
  }

  return (
    <>
      <View style={styles.commentTitleSpacing}>
        <Text style={styles.genInfoLeftSpaceNameContainer}>{props.account === ANONYMOUS_USER ? 'Anonymous' : 'User'}</Text>
        <Text style={styles.genInfoRightSpaceContainer}>{formatDate()}</Text>
      </View>
      <View>
        <Text style={styles.genInfoLeftSpaceContainer}>{props.text}</Text>
        <Text style={styles.genInfoLeftSpaceContainer}></Text>
      </View>
    </>
  )
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
    paddingTop: 10,
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
  genLeftTitleContainer:{
    marginTop: 1,
    marginLeft: 34,
    marginBottom: 10,
    fontSize: '25rem',
    fontWeight: 'bold'
  },
  genLeftCommentTitle:{
    marginTop: 1,
    marginLeft: 36,
    marginBottom: 10,
    fontSize: '18rem',
    fontWeight: 'bold'
  },
  genInfoLeftSpaceContainer:{
    marginTop: 1,
    marginLeft: 36,
    marginBottom: 10,
  },
  genInfoLeftSpaceNameContainer:{
    marginTop: 1,
    marginLeft: 36,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  genInfoRightSpaceContainer:{
    marginTop: 1,
    marginRight: 34,
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
  likesContainer:{
    opacity: 0
  }
});
