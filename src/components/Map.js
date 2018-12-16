import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { geocodeByAddress } from 'react-places-autocomplete';

class Map extends Component {
  state = {
    result: null,
    lat: null,
    lng: null,
  };

  async componentDidMount() {
    const { address } = this.props;
    const results = await geocodeByAddress(address);
    const result = results && results.length > 0 && results[0];
    if (result) {
      const lat = result.geometry.location.lat();
      const lng = result.geometry.location.lng();
      this.setState({ result, lat, lng });
    }
  }

  render() {
    const { result, lat, lng } = this.state;

    let GoogleMapContainer;
    if (result) {
      GoogleMapContainer = withGoogleMap(props => (
        <GoogleMap
          defaultCenter={{
            lat,
            lng,
          }}
          defaultZoom={13}
        >
          <Marker
            position={{
              lat,
              lng,
            }}
          />
        </GoogleMap>
      ));
    }

    return GoogleMapContainer ? (
      <div>
        <GoogleMapContainer
          containerElement={<div style={{ height: '500px', width: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      </div>
    ) : null;
  }
}

export default Map;
