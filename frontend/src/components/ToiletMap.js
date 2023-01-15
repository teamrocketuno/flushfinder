import React, { Component } from "react";
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, TouchableHighlight, View, Text } from "react-native";

const URL = 'http://172.104.196.152/';

export const ToiletMap = (props) => {
  const [lastUpdate, setLastUpdate] = React.useState(Date.now());
  const [markers, setMarkers] = React.useState([]);
  
  function onRegionChange(region) {
    // Grab new information from the backend
    if (Date.now() - lastUpdate < 4000) return; // Only update every 4 seconds
    setLastUpdate(Date.now());
  }

  async function fetchData() {
    try {
      let response = await fetch(URL + "data/all")
      let json = await response.json();
      return json.data;
    } catch (error) {
      throw error;
    }
  }

  React.useEffect(() => {
    // Asynchronously query grabbing of markers
    fetchData().then((data) => setMarkers(data)).catch((err) => console.log(err));
  }, [lastUpdate])
  
  return (
    <MapView style={styles.map} onRegionChange={onRegionChange}>
      <Marker key={1} coordinate={{latitude: 0, longitude: 0}} title={'test'} />
      <MarkerComponent markers={markers} navigation={props.navigation} />
    </MapView>
  );
};

class MarkerComponent extends Component {
  constructor(props) {
    super(props);
  }

  markerClick(importedMarker) {
    this.props.navigation.navigate('Bathroom', {marker: importedMarker})
  }

  renderMarkers() {
    return this.props.markers.map((importedMarker) => <Marker
        key = {importedMarker.id}
        title = {importedMarker.name}
        coordinate = {{ latitude: importedMarker.latitude, longitude: importedMarker.longitude }}
        description = {importedMarker.id}
        onPress = {() => this.markerClick(importedMarker)}
      >
        <Callout tooltip={false}>
        </Callout>
      </Marker>
    )
  }

  render() {
    return (this.renderMarkers());
  }
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
    zIndex: -1
  },
  callout: {
    opacity: 0,
  }
})