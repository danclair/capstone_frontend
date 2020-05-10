<template>
  <div>
    <h1>Event Info</h1>
    <h2>{{ event.title }}</h2>
    <img :src="event.image" width="500" alt="event.title" />
    <p>Description: {{ event.description }}</p>
    <p>Location: {{ event.location }}</p>
    <p>{{ event.date }} {{ event.time }}</p>
    <h3>Attendees</h3>
    <div v-for="user in event.users">
      <ul>
        <li>{{ user.first_name }} {{ user.last_name }}</li>
      </ul>
    </div>

    <button v-on:click="createEventUser()">Attend Event</button>
    |
    <a v-bind:href="`/events/${event.id}/edit`" v-if="event.is_owner">Edit event</a>
    |
    <a href="/events">Back to all events</a>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data: function() {
    return {
      event: {},
    };
  },
  created: function() {
    this.showEvent();
  },
  methods: {
    showEvent: function() {
      axios.get("/api/events/" + this.$route.params.id).then(response => {
        console.log("Get one event: ", response);
        this.event = response.data;
      });
    },
    createEventUser: function() {
      var params = {
        event_id: this.event.id,
      };
      axios
        .post("/api/event_users", params)
        .then(response => {
          this.$router.push("/event_users");
        })
        .catch(error => {
          console.log(error.response);
          this.errors = error.response.data.errors;
        });
    },
    // relativeDate: function() {
    //   return moment(event.date).format("MMMM Do, YYYY");
    // },
    // relativeTime: function() {
    //   return moment(event.time).format("h:mm a");
    // },
  },
};
</script>
