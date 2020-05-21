<template>
  <section class="wrapper style1">
    <div class="inner">
      <div>
        <h1>Events Near Me</h1>
      </div>

      <br />
      <div id="map"></div>
      <br />
      <a href="/events" class="large button">All Events</a>
    </div>
  </section>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
#map {
  top: 0;
  bottom: 0;
  height: 500px;
  width: auto;
}
</style>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data: function() {
    return {
      events: {},
      eventuser: {},
      comments: [],
      newCommentText: "",
    };
  },
  created: function() {},
  mounted: function() {
    this.getEvents();
    // this.showComments();
    // this.setupMap();
  },

  methods: {
    setupMap: function() {
      var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
      mapboxgl.accessToken =
        "pk.eyJ1IjoiZGFuY2xhaXIiLCJhIjoiY2thMzg5c3B3MGxycjNtcXdmYnI4OTU2YyJ9.RGBfD1rU5v1MFBYgcSEaiw";
      var map = new mapboxgl.Map({
        container: "map", // container id
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: [-95.7129, 39.0902], // starting position [lng, lat]
        zoom: 3, // starting zoom
      });
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          fitBoundsOptions: {
            maxZoom: 9.5,
          },
          trackUserLocation: true,
        })
      );
      var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
      this.events.forEach(event => {
        mapboxClient.geocoding
          .forwardGeocode({
            query: event.location,
            autocomplete: false,
            limit: 1,
          })
          .send()
          .then(function(response) {
            if (response && response.body && response.body.features && response.body.features.length) {
              var feature = response.body.features[0];
              var popup = new mapboxgl.Popup({ offset: 25, closeButton: false }).setHTML(
                `<b><p style="color:black;">${event.title}</p></b><p style="color:black;">${event.location}</p><p style="color:black;">${event.date} ${event.time}</p><a href="/events/${event.id}">Go to event page</a>`
              );
              new mapboxgl.Marker()
                .setLngLat(feature.center)
                .setPopup(popup)
                .addTo(map);
            }
          });
      });
    },
    getEvents: function() {
      axios.get("/api/events/").then(response => {
        console.log("Get events: ", response);
        this.events = response.data;
        this.setupMap();
      });
    },
  },
};
</script>
