<template>
  <div class="container">
    <h1>All Upcoming Events</h1>
    <br />
    <div v-for="event in events" class="card" style="width: 25rem;">
      <h2>{{ event.title }}</h2>
      <h5>{{ event.description }}</h5>
      <p>Date: {{ event.date }} Time: {{ event.time }}</p>
      <img :src="event.image" class="card-img-top" width="500" :alt="event.title" />
      <div>
        <a v-bind:href="`/events/${event.id}`" class="btn btn-link">Show event</a>
        <button v-on:click="createEventUser(event)">Attend Event</button>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      events: [],
    };
  },
  created: function() {
    axios.get("/api/events").then(response => {
      this.events = response.data;
      console.log(this.events);
    });
  },
  methods: {
    createEventUser: function() {
      var params = {
        event_id: this.newEventId,
        role: this.newEventRole,
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
  },
};
</script>
