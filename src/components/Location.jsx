import React, { Component, PropTypes } from 'react'
import * as RB from 'react-bootstrap';

export default class Location extends Component {

  constructor(props) {
    super(props)
    this.pos = undefined;
    this.initLocation = this.initLocation.bind(this);
  }

  initLocation(){
    navigator.geolocation.getCurrentPosition (
      position => {
        this.pos = position
      },
      error => {
        console.log(error)
      },
      {
        maximumAge: 300,
        timeout: 5000,
        enableHighAccuracy: true
      }
    );
  }

  render() {

    this.initLocation();

    setTimeout(() => {
      let elem = document.getElementById('geo');
      elem.innerHTML = 'Longitude: ' + this.pos.coords.latitude + '<br />' + 'Latitude: ' + this.pos.coords.longitude + '<br />' + 'Accuracy: ' + this.pos.coords.accuracy;
    }, 1000);

    return (
      <div id='geo'>
        loading ..
      </div>
    );

  }
}
