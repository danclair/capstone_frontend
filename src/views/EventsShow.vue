<template>
  <section class="wrapper style1">
    <div class="inner">
      <div>
        <h1><u>Event Info</u></h1>
      </div>
      <h2>{{ event.title }}</h2>
      <img :src="event.image" class="responsive" alt="event.title" />
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
      <div class="col-6 col-12-medium alt special" v-for="comment in event.comments">
        <ul class="alt">
          <li>
            <b>{{ comment.first_name }} {{ comment.last_name }}:</b>
            {{ comment.text }}
            <br />
            <!-- <small>(on {{ comment.posted }})</small> -->
          </li>
        </ul>
      </div>
      <div class="col-6 col-12-medium alt special">
        <textarea
          v-model="newCommentText"
          name="demo-message"
          id="demo-message"
          placeholder="Add a comment"
          rows="2"
        ></textarea>
        <div>
          <ul class="actions">
            <li>
              <input type="submit" v-on:click="createComment()" value="Submit Comment" class="button primary small" />
            </li>
          </ul>
        </div>
      </div>
      <br />

      <h4>Attendees / Cars:</h4>
      <div v-for="user in event.users">
        <ul>
          <li>
            <b>
              <u>{{ user.first_name }} {{ user.last_name }}</u>
            </b>
          </li>
          <div v-for="vehicle in user.vehicles">
            <ul>
              <p>{{ user.first_name }}'s {{ vehicle.make.manufacturer }} {{ vehicle.vehicle_model.name }}</p>
              <img :src="`${vehicle.image}`" width="40%" />
            </ul>
          </div>
        </ul>
      </div>

      <section>
        <button class="primary button icon solid fa-thumbs-up" v-on:click="createEventUser()">Attend Event</button>
        <button class="button icon solid fa-thumbs-down" v-on:click="destroyEventUser(eventuser)">
          Don't Attend Event
        </button>
      </section>
      <br />
      <section>
        <a v-bind:href="`/events/${event.id}/edit`" v-if="event.is_owner" class="button icon solid fa-edit">
          Edit event
        </a>
        <br />
        <a href="/events" class="button icon solid fa-arrow-left">Back to all events</a>
      </section>
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
  width: auto;
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
      newCommentText: "",
      vehicles: [],
    };
  },
  created: function() {},
  mounted: function() {
    this.showEvent();
    this.showComments();
    this.getVehicles();
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
        .then(response => {
          if (response && response.body && response.body.features && response.body.features.length) {
            var feature = response.body.features[0];

            var map = new mapboxgl.Map({
              container: "map",
              style: "mapbox://styles/mapbox/streets-v11",
              center: feature.center,
              zoom: 12,
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
            new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
            var directions = new MapboxDirections({
              accessToken: mapboxgl.accessToken,
              // placeholderDestination: "200 S Columbus Drive, Chicago",
            });
            map.addControl(directions, "top-left");

            directions.setDestination(this.event.location);
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
    getVehicles: function() {
      axios.get("/api/vehicles").then(response => {
        console.log("Get vehicles: ", response);
        this.vehicles = response.data;
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
    createComment: function() {
      var params = {
        event_id: this.event.id,
        text: this.newCommentText,
      };

      axios
        .post("/api/comments", params)
        .then(response => {
          location.reload();
        })
        .catch(error => {
          console.log(error.response);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
