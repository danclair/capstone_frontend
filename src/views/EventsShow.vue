<template>
  <div id="one" class="wrapper style1">
    <h1>Event Info</h1>
    <h2>{{ event.title }}</h2>
    <img :src="event.image" width="500" alt="event.title" />
    <p>What: {{ event.description }}</p>
    <p>When: {{ event.date }} {{ event.time }}</p>
    <p>Where: {{ event.location }}</p>
    <div id="map"></div>
    <h4>Comments</h4>
    <div v-for="comment in event.comments">
      <!-- <p>{{ comment.user }}</p> -->
      <p>{{ comment.text }}</p>
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
  created: function() {
    this.showEvent();
    this.showComments();
  },
  mounted: function() {
    var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
    mapboxgl.accessToken = "pk.eyJ1IjoiZGFuY2xhaXIiLCJhIjoiY2thMzg5c3B3MGxycjNtcXdmYnI4OTU2YyJ9.RGBfD1rU5v1MFBYgcSEaiw";
    var map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-87.6792019, 41.9298614], // starting position [lng, lat]
      zoom: 12,
    });

    var marker = new mapboxgl.Marker().setLngLat([-87.6792019, 41.9298614]).addTo(map);

    map.addControl(new mapboxgl.NavigationControl());
  },
  methods: {
    showEvent: function() {
      axios.get("/api/events/" + this.$route.params.id).then(response => {
        console.log("Get one event: ", response);
        this.event = response.data;
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
          this.$router.push("/events/" + this.$route.params.id);
        })
        .catch(error => {
          console.log(error.response);
          this.errors = error.response.data.errors;
        });
    },
    destroyEventUser: function(eventuser) {
      axios.delete("/api/event_users/" + this.$route.params.id).then(response => {
        this.$router.push("/events/" + this.$route.params.id);
      });
    },
  },
};
</script>
