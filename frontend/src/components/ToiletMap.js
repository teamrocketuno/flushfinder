import React, { Component } from "react";
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet } from "react-native";

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
      <MarkerComponent markers={markers} />
    </MapView>
  );
};

class MarkerComponent extends Component {
  constructor(props) {
    super(props);
  }

  renderMarkers() {
    console.log('Attempting render of ' + this.props.markers.length + ' markers!')
    return this.props.markers.map((importedMarker) => <Marker
       key = {importedMarker.id}
       title = {importedMarker.name}
       coordinate = {{ latitude: importedMarker.latitude, longitude: importedMarker.longitude }}
       description = {importedMarker.id}
     />
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
})