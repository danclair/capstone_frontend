<template>
  <section class="wrapper style1">
    <div class="inner">
      <div>
        <h1>Events Near Me</h1>
      </div>

      <h1>MAP HERE HERE HERE</h1>
      <br />
      <div id="map"></div>
    </div>
  </section>
</template>

<style>
.responsive {
  width: 100%;
  height: auto;
}
body {
  margin: 0;
  padding: 0;
}
#map {
  top: 0;
  bottom: 0;
  height: 300px;
  width: 500px;
}
</style>

<script>
import axios from "axios";
import moment from "moment";

// var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
// mapboxgl.accessToken = "pk.eyJ1IjoiZGFuY2xhaXIiLCJhIjoiY2thMzg5c3B3MGxycjNtcXdmYnI4OTU2YyJ9.RGBfD1rU5v1MFBYgcSEaiw";
// var map = new mapboxgl.Map({
//   container: "map", // container id
//   style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
//   center: [-74.5, 40], // starting position [lng, lat]
//   zoom: 9, // starting zoom
// });

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
    this.showEvents();
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
        center: [-95.7129, 37.0902], // starting position [lng, lat]
        zoom: 2.5, // starting zoom
      });
      // this.events.forEach(event => {
      //   var popup = new mapboxgl.Popup({ offset: 25 }).setText(event.location);
      // });

      // Add geolocate control to the map.
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        })
      );
    },
    showEvents: function() {
      axios.get("/api/events/").then(response => {
        console.log("Get events: ", response);
        this.events = response.data;
        this.setupMap();
      });
    },
    // setupMap: function() {
    //   var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
    //   mapboxgl.accessToken =
    //     "pk.eyJ1IjoiZGFuY2xhaXIiLCJhIjoiY2thMzg5c3B3MGxycjNtcXdmYnI4OTU2YyJ9.RGBfD1rU5v1MFBYgcSEaiw";
    //   var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
    //   mapboxClient.geocoding
    //     .forwardGeocode({
    //       query: this.event.location,
    //       autocomplete: false,
    //       limit: 1,
    //     })
    //     .send()
    //     .then(function(response) {
    //       if (response && response.body && response.body.features && response.body.features.length) {
    //         var feature = response.body.features[0];
    //         var map = new mapboxgl.Map({
    //           container: "map",
    //           style: "mapbox://styles/mapbox/streets-v11",
    //           center: feature.center,
    //           zoom: 12,
    //         });
    //         new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
    //       }
    //     });
    // },
    // showEvent: function() {
    //   axios.get("/api/events/" + this.$route.params.id).then(response => {
    //     console.log("Get one event: ", response);
    //     this.event = response.data;
    //     this.setupMap();
    //   });
    // },
    // showComments: function() {
    //   axios.get("/api/comments").then(response => {
    //     console.log("Get one comment: ", response);
    //     this.comments = response.data;
    //   });
    // },
    // createEventUser: function() {
    //   var params = {
    //     event_id: this.event.id,
    //   };
    //   axios
    //     .post("/api/event_users", params)
    //     .then(response => {
    //       location.reload();
    //       // this.$router.push("/events/" + this.$route.params.id);
    //       // push user's name into event_users?
    //     })
    //     .catch(error => {
    //       console.log(error.response);
    //       this.errors = error.response.data.errors;
    //     });
    // },
    // destroyEventUser: function(eventuser) {
    //   axios.delete("/api/event_users/0?event_id=" + this.$route.params.id).then(response => {
    //     // this.$router.push("/events/" + this.$route.params.id);
    //     location.reload();
    //   });
    // },
    // createComment: function() {
    //   var params = {
    //     event_id: this.event.id,
    //     text: this.newCommentText,
    //   };
    //   axios
    //     .post("/api/comments", params)
    //     .then(response => {
    //       location.reload();
    //     })
    //     .catch(error => {
    //       console.log(error.response);
    //       this.errors = error.response.data.errors;
    //     });
    // },
  },
};
</script>
