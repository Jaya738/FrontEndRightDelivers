import React, { Component } from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  // InfoWindow,
} from "react-google-maps";
import "./maps.css";
import Geocode from "react-geocode";
import Autocomplete from "react-google-autocomplete";
import { GoogleMapsAPI } from "../../config";
Geocode.setApiKey(GoogleMapsAPI);
Geocode.enableDebug();

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      showMapFooter: true,
      city: "",
      area: "",
      state: "",
      mapPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng,
      },
      markerPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng,
      },
    };
  }
  /**
   * Get the current address from the default map position and set those values in the state
   */
  componentDidMount() {
    this.getLiveLocation();
    Geocode.fromLatLng(
      this.state.mapPosition.lat,
      this.state.mapPosition.lng
    ).then(
      (response) => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = this.getCity(addressArray),
          area = this.getArea(addressArray),
          state = this.getState(addressArray);
        this.setState({
          ...this.state,
          showMapFooter: true,
          address: address ? address : "",
          area: area ? area : "",
          city: city ? city : "",
          state: state ? state : "",
        });
        this.props.handleAddressFromMap(this.state);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  handleLocationError = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    this.props.setError(
      "Please Allow location access. ( Unblock if not prompted to allow)"
    );
    this.props.setShowToast(true);
  };

  getLiveLocation = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 10000,
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.setLiveLocation,
        this.handleLocationError,
        options
      );
    } else {
      this.props.setError("Location Service is not supported by your device.");
      this.props.setShowToast(true);
    }
  };

  setLiveLocation = ({ coords }) => {
    console.log(coords);
    Geocode.fromLatLng(coords.latitude, coords.longitude).then((response) => {
      const address = response.results[0].formatted_address,
        addressArray = response.results[0].address_components,
        city = this.getCity(addressArray),
        area = this.getArea(addressArray),
        state = this.getState(addressArray);

      this.setState({
        ...this.state,
        showMapFooter: true,
        address: address ? address : "",
        area: area ? area : "",
        city: city ? city : "",
        state: state ? state : "",
        mapPosition: {
          lat: coords.latitude,
          lng: coords.longitude,
        },
        markerPosition: {
          lat: coords.latitude,
          lng: coords.longitude,
        },
      });
      this.props.handleAddressFromMap(this.state);
    });
  };

  handleCloseFooter = () => {
    this.setState({
      ...this.state,
      showMapFooter: false,
    });
  };
  /**
   * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
   *
   * @param nextProps
   * @param nextState
   * @return {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.markerPosition.lat !== this.props.center.lat ||
      this.state.address !== nextState.address ||
      this.state.city !== nextState.city ||
      this.state.area !== nextState.area ||
      this.state.state !== nextState.state
    ) {
      return true;
    } else if (this.props.center.lat === nextProps.center.lat) {
      return false;
    }
  }

  getCity = (addressArray) => {
    let city = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (
        addressArray[i].types[0] &&
        "administrative_area_level_2" === addressArray[i].types[0]
      ) {
        city = addressArray[i].long_name;
        return city;
      }
    }
  };

  getArea = (addressArray) => {
    let area = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if (
            "sublocality_level_1" === addressArray[i].types[j] ||
            "locality" === addressArray[i].types[j]
          ) {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  };

  getState = (addressArray) => {
    let state = "";
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (
          addressArray[i].types[0] &&
          "administrative_area_level_1" === addressArray[i].types[0]
        ) {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
  };
  /**
   * And function for city,state and address input
   * @param event
   */
  // onChange = (event) => {
  //   this.setState({ [event.target.name]: event.target.value });
  // };
  /**
   * This Event triggers when the marker window is closed
   *
   * @param event
   */
  // onInfoWindowClose = (event) => {};

  /**
   * When the marker is dragged you get the lat and long using the functions available from event object.
   * Use geocode to get the address, city, area and state from the lat and lng positions.
   * And then set those values in the state.
   *
   * @param event
   */
  onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat(),
      newLng = event.latLng.lng();

    Geocode.fromLatLng(newLat, newLng).then(
      (response) => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = this.getCity(addressArray),
          area = this.getArea(addressArray),
          state = this.getState(addressArray);
        this.setState({
          ...this.state,
          showMapFooter: true,
          address: address ? address : "",
          area: area ? area : "",
          city: city ? city : "",
          state: state ? state : "",
          markerPosition: {
            lat: newLat,
            lng: newLng,
          },
          mapPosition: {
            lat: newLat,
            lng: newLng,
          },
        });
        this.props.handleAddressFromMap(this.state);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  /**
   * When the user types an address in the search box
   * @param place
   */
  onPlaceSelected = (place) => {
    const address = place.formatted_address,
      addressArray = place.address_components,
      city = this.getCity(addressArray),
      area = this.getArea(addressArray),
      state = this.getState(addressArray),
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng();
    // Set these values in the state.
    this.setState({
      ...this.state,
      showMapFooter: true,
      address: address ? address : "",
      area: area ? area : "",
      city: city ? city : "",
      state: state ? state : "",
      markerPosition: {
        lat: latValue,
        lng: lngValue,
      },
      mapPosition: {
        lat: latValue,
        lng: lngValue,
      },
    });
    this.props.handleAddressFromMap(this.state);
  };

  render() {
    const AsyncMap = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          google={this.props.google}
          defaultZoom={this.props.zoom}
          defaultCenter={{
            lat: this.state.mapPosition.lat,
            lng: this.state.mapPosition.lng,
          }}
        >
          <Marker
            google={this.props.google}
            name={"Pin"}
            draggable={true}
            onDragEnd={this.onMarkerDragEnd}
            position={{
              lat: this.state.markerPosition.lat,
              lng: this.state.markerPosition.lng,
            }}
          />
          <Marker />

          <div className="map-overlay d-flex">
            <i
              style={{ fontSize: "18px", marginTop: "3vh" }}
              className="fa fa-search"
              aria-hidden="true"
            ></i>
            <Autocomplete
              style={{
                width: "55%",
                height: "6vh",
                right: "2%",
                paddingLeft: "16px",
                background: "none",
                border: "0",
                outline: "0",
                color: "white",
                borderRadius: "5px",
                position: "relative",
                marginTop: "8px",
                fontSize: "16px",
              }}
              onPlaceSelected={this.onPlaceSelected}
              types={["(regions)"]}
              placeholder="Search your location"
              componentRestrictions={{ country: "in" }}
            />
            <span
              onClick={this.getLiveLocation}
              style={{
                color: "white",
                marginTop: "2.7vh",
                paddingRight: "10px",
              }}
            >
              Live Location
            </span>
            <i
              className="fa fa-map-marked-alt icon__1"
              style={{ color: "white" }}
              onClick={this.getLiveLocation}
              aria-hidden="true"
            ></i>
          </div>
          <div
            className="map-overlay-footer"
            style={{ display: this.state.showMapFooter ? "block" : "none" }}
          >
            <div className="show-address">{this.state.address}</div>
            <span
              className="close-address-display"
              onClick={this.handleCloseFooter}
            >
              <i className="fa fa-times" aria-hidden="true"></i>
            </span>

            <span
              className="next-address-button"
              onClick={this.props.handleCloseMap}
            >
              Continue
              <i className="fa fa-angle-right ml-2" aria-hidden="true"></i>
            </span>
          </div>
        </GoogleMap>
      ))
    );
    let map;
    if (this.props.center.lat !== undefined) {
      map = (
        <div>
          <AsyncMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GoogleMapsAPI}&libraries=places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={
              <div style={{ height: "100vh", margin: "0", padding: "0" }} />
            }
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      );
    } else {
      map = <div style={{ height: this.props.height }} />;
    }
    return map;
  }
}
export default Map;
