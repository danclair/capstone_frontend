<template>
  <section class="wrapper style1">
    <div class="inner">
      <!-- <div id="one" class="wrapper style1"> -->
      <h1>Event Info</h1>
      <h2>{{ event.title }}</h2>
      <img :src="event.image" width="500" alt="event.title" />
      <p>
        <b>What:</b>
        {{ event.description }}
      </p>
      <p>
        <b>When:</b>
        {{ event.date }} {{ event.time }}
      </p>
      <p>
        <b>Where:</b>
        {{ event.location }}
      </p>
      <div id="map"></div>
      <br />
      <h4>Comments</h4>
      <div v-for="comment in event.comments">
        <p>
          <b>{{ comment.first_name }} {{ comment.last_name }}:</b>
          {{ comment.text }}
        </p>
        <p></p>
      </div>
      <h4>Attendees:</h4>
      <div v-for="user in event.users">
        <ul>
          <li>{{ user.first_name }} {{ user.last_name }}</li>
        </ul>
      </div>

      <button v-on:click="createEventUser()">Attend Event</button>
      <button v-on:click="destroyEventUser(eventuser)">Don't Attend Event</button>
      |
      <a v-bind:href="`/events/${event.id}/edit`" v-if="event.is_owner">Edit event</a>
      |
      <a href="/events">Back to all events</a>
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
  height: 300px;
  width: 500px;
}
</style>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data: function() {
    return {
      event: {},
      eventuser: {},
      comments: [],
    };
  },
  created: function() {},
  mounted: function() {
    this.showEvent();
    this.showComments();
  },

  methods: {
    setupMap: function() {
      var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
      mapboxgl.accessToken =
        "pk.eyJ1IjoiZGFuY2xhaXIiLCJhIjoiY2thMzg5c3B3MGxycjNtcXdmYnI4OTU2YyJ9.RGBfD1rU5v1MFBYgcSEaiw";

      var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
      mapboxClient.geocoding
        .forwardGeocode({
          query: this.event.location,
          autocomplete: false,
          limit: 1,
        })
        .send()
        .then(function(response) {
          if (response && response.body && response.body.features && response.body.features.length) {
            var feature = response.body.features[0];

            var map = new mapboxgl.Map({
              container: "map",
              style: "mapbox://styles/mapbox/streets-v11",
              center: feature.center,
              zoom: 10,
            });
            new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
          }
        });
    },
    showEvent: function() {
      axios.get("/api/events/" + this.$route.params.id).then(response => {
        console.log("Get one event: ", response);
        this.event = response.data;
        this.setupMap();
      });
    },
    showComments: function() {
      axios.get("/api/comments").then(response => {
        console.log("Get one comment: ", response);
        this.comments = response.data;
      });
    },
    createEventUser: function() {
      var params = {
        event_id: this.event.id,
      };
      axios
        .post("/api/event_users", params)
        .then(response => {
          location.reload();
          // this.$router.push("/events/" + this.$route.params.id);
          // push user's name into event_users?
        })
        .catch(error => {
          console.log(error.response);
          this.errors = error.response.data.errors;
        });
    },
    destroyEventUser: function(eventuser) {
      axios.delete("/api/event_users/0?event_id=" + this.$route.params.id).then(response => {
        // this.$router.push("/events/" + this.$route.params.id);
        location.reload();
      });
    },
  },
};
</script>
