import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView, Dimensions} from 'react-native';

import MapView from 'react-native-maps';

const { height, width } = Dimensions.get('window');

export default class App extends Component {
  state = {
    places: [
      {
        id: 1,
        title: 'Casa do café',
        description: 'Café quentinho...',
        latitude: -27.2106710,
        longitude: -49.6362700,
      },
      {
        id: 2,
        title: 'RocketSeat',
        description: 'Programação, empreendedorismo e mindset',
        latitude: -27.2006710,
        longitude: -49.6362700,
      },
      {
        id: 3,
        title: 'Casa do José',
        description: 'José, ta em casa?',
        latitude: -27.2006710,
        longitude: -49.6262700,
      }
    ]
  }

  _mapReady = () => {
    this.state.places[0].mark.showCallout();
  }

  render() {
    const { latitude, longitude } = this.state.places[0];

    return (
      <View style={styles.container}>
        <MapView
          ref={map => this.mapView = map}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.0142,
            longitudeDelta: 0.0231
          }}
          style={styles.mapView}
          rotateEnabled={false}
          scrollEnabled={false}
          zoomEnabled={false}
          showPointsOfInterest={false}
          showsBuildings={false}
          onMapReady={this._mapReady}
        >
          { this.state.places.map(place => (
            <MapView.Marker
              ref={mark => place.mark = mark}
              key={place.id}
              title={place.title}
              description={place.description}
              coordinate={{
                latitude: place.latitude,
                longitude: place.longitude,
              }}
            />
          )) }
        </MapView>
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onMomentumScrollEnd={e => {
              const scrolled = e.nativeEvent.contentOffset.x;
              const place = (scrolled > 0)
                ? scrolled / Dimensions.get('window').width
                : 0;
              const { latitude, longitude, mark } = this.state.places[place];
              this.mapView.animateToCoordinate({
                latitude,
                longitude
              }, 1000);

              setTimeout(() => {
                mark.showCallout();
              }, 1000);
            }}
            style={styles.placesContainer}>
            { this.state.places.map(place => (
              <View key={place.id} style={styles.place}>
                <Text>{place.title}</Text>
                <Text>{place.description}</Text>
              </View>
            )) }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  mapView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  placesContainer: {
    width: '100%',
    maxHeight: 200,
  },
  place: {
    width: width - 40,
    maxHeight: 200,
    backgroundColor: '#FFF',
    marginHorizontal: 20,
  }
});
